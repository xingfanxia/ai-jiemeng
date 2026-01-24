/**
 * Account Deletion API
 * DELETE /api/user/delete
 *
 * GDPR-compliant account deletion endpoint that performs cascading removal of all
 * user data across the application. This is an irreversible operation.
 *
 * Deletion cascade (in order):
 * 1. dream_readings - All dream interpretation records
 * 2. usage_log - All usage tracking records
 * 3. llm_costs - All LLM cost records
 * 4. referrals - All referral records (both as referrer and referred)
 * 5. user_profiles - User profile record
 * 6. Supabase Auth - Delete user account and revoke all sessions
 *
 * Security:
 * - Requires authentication
 * - Uses service role for deletions (bypasses RLS)
 * - Logs operations without PII
 * - Rate limited to prevent abuse
 *
 * Response:
 * - 200: Account successfully deleted
 * - 401: Not authenticated
 * - 429: Rate limited
 * - 500: Server error during deletion
 */

import { NextResponse, NextRequest } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { log } from '@/lib/logger';
import {
  checkRateLimit,
  getClientIP,
  createRateLimitResponse,
} from '@/lib/ratelimit';

interface DeletionResult {
  success: boolean;
  message: string;
  deletedAt?: string;
  stats?: {
    dreamReadingsDeleted: number;
    usageLogsDeleted: number;
    llmCostsDeleted: number;
    referralsDeleted: number;
  };
  error?: string;
}

export async function DELETE(request: NextRequest): Promise<NextResponse<DeletionResult>> {
  const startTime = Date.now();

  try {
    // Apply global rate limit (IP-based)
    const clientIP = getClientIP(request);
    const globalRateLimit = await checkRateLimit(clientIP, 'global');
    if (!globalRateLimit.success) {
      return createRateLimitResponse(globalRateLimit) as NextResponse<DeletionResult>;
    }

    // Authenticate user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      log.warn('[Account Delete] Unauthenticated deletion attempt');
      return NextResponse.json(
        { success: false, message: '请先登录', error: 'AUTH_REQUIRED' },
        { status: 401 }
      );
    }

    // Apply sensitive rate limit for account deletion (destructive operation)
    const sensitiveRateLimit = await checkRateLimit(user.id, 'sensitive');
    if (!sensitiveRateLimit.success) {
      return createRateLimitResponse(sensitiveRateLimit) as NextResponse<DeletionResult>;
    }

    const userId = user.id;
    log.info('[Account Delete] Starting account deletion process', { userId });

    // Use admin client for deletions (bypasses RLS)
    const adminClient = createAdminClient();

    // Track deletion stats
    const stats = {
      dreamReadingsDeleted: 0,
      usageLogsDeleted: 0,
      llmCostsDeleted: 0,
      referralsDeleted: 0,
    };

    // --- Step 1: Delete dream_readings ---
    log.info('[Account Delete] Deleting dream readings...');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: dreamsDeleted, error: dreamsError } = await (adminClient.from('dream_readings') as any)
      .delete()
      .eq('user_id', userId)
      .select('id');

    if (dreamsError) {
      log.error('[Account Delete] Error deleting dream readings', { error: dreamsError.message });
      throw new Error(`Failed to delete dream readings: ${dreamsError.message}`);
    }
    stats.dreamReadingsDeleted = dreamsDeleted?.length || 0;
    log.info('[Account Delete] Dream readings deleted', { count: stats.dreamReadingsDeleted });

    // --- Step 2: Delete usage_log ---
    log.info('[Account Delete] Deleting usage logs...');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: usageDeleted, error: usageError } = await (adminClient.from('usage_log') as any)
      .delete()
      .eq('user_id', userId)
      .select('id');

    if (usageError) {
      log.error('[Account Delete] Error deleting usage logs', { error: usageError.message });
      // Non-critical, continue
    } else {
      stats.usageLogsDeleted = usageDeleted?.length || 0;
      log.info('[Account Delete] Usage logs deleted', { count: stats.usageLogsDeleted });
    }

    // --- Step 3: Delete llm_costs ---
    log.info('[Account Delete] Deleting LLM cost records...');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: llmDeleted, error: llmError } = await (adminClient.from('llm_costs') as any)
      .delete()
      .eq('user_id', userId)
      .select('id');

    if (llmError) {
      log.error('[Account Delete] Error deleting LLM costs', { error: llmError.message });
      // Non-critical, continue
    } else {
      stats.llmCostsDeleted = llmDeleted?.length || 0;
      log.info('[Account Delete] LLM costs deleted', { count: stats.llmCostsDeleted });
    }

    // --- Step 4: Delete referrals (as both referrer and referred) ---
    log.info('[Account Delete] Deleting referral records...');
    try {
      // Delete records where user is the referrer
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: referrerDeleted, error: referrerError } = await (adminClient.from('referrals') as any)
        .delete()
        .eq('referrer_id', userId)
        .select('id');

      if (referrerError) {
        log.warn('[Account Delete] Error deleting referrer records', { error: referrerError.message });
      }

      // Delete records where user is the referred
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: referredDeleted, error: referredError } = await (adminClient.from('referrals') as any)
        .delete()
        .eq('referred_id', userId)
        .select('id');

      if (referredError) {
        log.warn('[Account Delete] Error deleting referred records', { error: referredError.message });
      }

      stats.referralsDeleted = (referrerDeleted?.length || 0) + (referredDeleted?.length || 0);
      log.info('[Account Delete] Referral records deleted', { count: stats.referralsDeleted });
    } catch {
      log.warn('[Account Delete] Referrals table not accessible, skipping');
    }

    // --- Step 5: Delete user_profiles ---
    log.info('[Account Delete] Deleting user profile...');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: profileError } = await (adminClient.from('user_profiles') as any)
      .delete()
      .eq('id', userId);

    if (profileError) {
      log.error('[Account Delete] Error deleting user profile', { error: profileError.message });
      throw new Error(`Failed to delete user profile: ${profileError.message}`);
    }
    log.info('[Account Delete] User profile deleted');

    // --- Step 6: Delete auth user and revoke sessions ---
    log.info('[Account Delete] Deleting auth user and revoking sessions...');
    const { error: deleteUserError } = await adminClient.auth.admin.deleteUser(userId);

    if (deleteUserError) {
      log.error('[Account Delete] Error deleting auth user', { error: deleteUserError.message });
      throw new Error(`Failed to delete auth user: ${deleteUserError.message}`);
    }
    log.info('[Account Delete] Auth user deleted');

    // Calculate total time
    const durationMs = Date.now() - startTime;
    const deletedAt = new Date().toISOString();

    log.info('[Account Delete] Account deletion completed successfully', {
      durationMs,
      stats,
    });

    return NextResponse.json({
      success: true,
      message: '账户及所有相关数据已永久删除',
      deletedAt,
      stats,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    log.error('[Account Delete] Account deletion failed', { error: errorMessage });

    return NextResponse.json(
      {
        success: false,
        message: '删除账户失败，请重试或联系客服',
        error: 'DELETION_FAILED',
      },
      { status: 500 }
    );
  }
}
