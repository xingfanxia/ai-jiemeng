/**
 * GDPR Data Export API
 * GET /api/user/export
 *
 * Exports all user data for GDPR Article 20 compliance (Right to Data Portability).
 * Requires authentication.
 * Rate limited to 10 requests per hour.
 *
 * Optionally supports ?download=true for file download.
 *
 * Data exported:
 * - User profile
 * - Dream readings
 * - Usage logs
 * - LLM cost records
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { log } from '@/lib/logger';
import {
  checkRateLimit,
  getClientIP,
  createRateLimitResponse,
} from '@/lib/ratelimit';

// Response type definitions for type safety
interface UserProfileExport {
  id: string;
  total_credits: number;
  tier: string;
  last_checkin_date: string | null;
  max_saved_readings: number;
  total_unlocks: number;
  created_at: string;
  updated_at: string;
}

interface DreamReadingExport {
  id: string;
  title: string | null;
  content: string;
  dream_date: string;
  recorded_at: string;
  mood_before: unknown;
  mood_after: unknown;
  clarity: number | null;
  vividness: number | null;
  dream_type: string;
  extracted_symbols: string[];
  interpretations: unknown;
  fortune_score: number | null;
  fortune_type: string | null;
  chat_messages: unknown[];
  source: string;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

interface UsageLogExport {
  id: string;
  action: string;
  app: string;
  credits_before: number | null;
  credits_after: number | null;
  metadata: unknown;
  created_at: string;
}

interface LlmCostExport {
  id: string;
  provider: string;
  model: string;
  input_tokens: number;
  output_tokens: number;
  estimated_cost: number;
  latency_ms: number;
  app: string;
  endpoint: string;
  success: boolean;
  error_type: string | null;
  metadata: unknown;
  created_at: string;
}

interface GDPRExportResponse {
  exportDate: string;
  exportVersion: string;
  userId: string;
  userEmail: string | null;
  data: {
    profile: UserProfileExport | null;
    dreamReadings: DreamReadingExport[];
    usageLog: UsageLogExport[];
    llmCosts: LlmCostExport[];
  };
  metadata: {
    totalDreamReadings: number;
    totalUsageLogs: number;
    totalLlmCosts: number;
    dataRetentionNote: string;
  };
}

export async function GET(request: NextRequest) {
  try {
    // Apply global rate limit (IP-based)
    const clientIP = getClientIP(request);
    const globalRateLimit = await checkRateLimit(clientIP, 'global');
    if (!globalRateLimit.success) {
      return createRateLimitResponse(globalRateLimit);
    }

    const supabase = await createClient();

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'AUTH_REQUIRED', message: '请先登录以导出数据' },
        { status: 401 }
      );
    }

    // Apply sensitive rate limit for data export (prevent abuse)
    const sensitiveRateLimit = await checkRateLimit(user.id, 'sensitive');
    if (!sensitiveRateLimit.success) {
      return createRateLimitResponse(sensitiveRateLimit);
    }

    log.info('[Data Export] Starting data export', { userId: user.id });

    // Fetch all user data in parallel
    const [
      profileResult,
      dreamReadingsResult,
      usageLogResult,
      llmCostsResult,
    ] = await Promise.all([
      // User profile
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (supabase.from('user_profiles') as any)
        .select('*')
        .eq('id', user.id)
        .single(),

      // Dream readings (all)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (supabase.from('dream_readings') as any)
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),

      // Usage log
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (supabase.from('usage_log') as any)
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),

      // LLM costs
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (supabase.from('llm_costs') as any)
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
    ]);

    // Handle errors (profile might not exist for new users)
    if (profileResult.error && profileResult.error.code !== 'PGRST116') {
      log.error('[Data Export] Failed to fetch user profile:', profileResult.error);
    }
    if (dreamReadingsResult.error) {
      log.error('[Data Export] Failed to fetch dream readings:', dreamReadingsResult.error);
      return NextResponse.json(
        { error: 'EXPORT_ERROR', message: '导出梦境数据失败' },
        { status: 500 }
      );
    }
    if (usageLogResult.error) {
      log.error('[Data Export] Failed to fetch usage log:', usageLogResult.error);
      return NextResponse.json(
        { error: 'EXPORT_ERROR', message: '导出使用记录失败' },
        { status: 500 }
      );
    }
    if (llmCostsResult.error) {
      log.error('[Data Export] Failed to fetch LLM costs:', llmCostsResult.error);
      return NextResponse.json(
        { error: 'EXPORT_ERROR', message: '导出API消耗记录失败' },
        { status: 500 }
      );
    }

    // Build export response
    const exportData: GDPRExportResponse = {
      exportDate: new Date().toISOString(),
      exportVersion: '1.0.0',
      userId: user.id,
      userEmail: user.email || null,
      data: {
        profile: profileResult.data || null,
        dreamReadings: dreamReadingsResult.data || [],
        usageLog: usageLogResult.data || [],
        llmCosts: llmCostsResult.data || [],
      },
      metadata: {
        totalDreamReadings: dreamReadingsResult.data?.length || 0,
        totalUsageLogs: usageLogResult.data?.length || 0,
        totalLlmCosts: llmCostsResult.data?.length || 0,
        dataRetentionNote: '此导出包含与您账户相关的所有数据。根据GDPR第20条，您有权以结构化、常用、机器可读的格式接收此数据。',
      },
    };

    // Log the export action
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from('usage_log') as any).insert({
      user_id: user.id,
      action: 'gdpr_data_export',
      app: 'dream',
      metadata: {
        export_date: exportData.exportDate,
        total_records: exportData.metadata.totalDreamReadings +
                       exportData.metadata.totalUsageLogs +
                       exportData.metadata.totalLlmCosts,
      },
    });

    log.info('[Data Export] Export completed', {
      userId: user.id,
      totalRecords: exportData.metadata.totalDreamReadings +
                    exportData.metadata.totalUsageLogs +
                    exportData.metadata.totalLlmCosts,
    });

    // Check if download mode is requested
    const downloadMode = request.nextUrl.searchParams.get('download') === 'true';

    const headers = {
      'X-RateLimit-Limit': String(sensitiveRateLimit.limit),
      'X-RateLimit-Remaining': String(sensitiveRateLimit.remaining),
      'X-RateLimit-Reset': String(sensitiveRateLimit.reset),
    };

    if (downloadMode) {
      // Return as downloadable JSON file
      const filename = `jiemeng-data-export-${new Date().toISOString().split('T')[0]}.json`;
      return new NextResponse(JSON.stringify(exportData, null, 2), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="${filename}"`,
          ...headers,
        },
      });
    }

    // Return as regular JSON response
    return NextResponse.json(exportData, {
      status: 200,
      headers,
    });
  } catch (error) {
    log.error('[Data Export] API error:', error);
    return NextResponse.json(
      { error: 'SERVER_ERROR', message: '服务器错误' },
      { status: 500 }
    );
  }
}
