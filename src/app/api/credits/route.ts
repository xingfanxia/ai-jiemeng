/**
 * Credits API Route
 *
 * GET /api/credits
 * Returns user's credit balance and check-in status
 * Uses the get_credits RPC function which handles daily bonus automatically
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { GetCreditsResult } from '@/lib/supabase/types';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      // Anonymous users get free credits for demo
      return NextResponse.json({
        credits: 3,
        checkedInToday: false,
        bonusAwarded: false,
      });
    }

    // Get credits using the RPC function (handles daily check-in bonus automatically)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.rpc as any)('get_credits', {
      p_user_id: user.id,
    });

    if (error) {
      console.error('Get credits error:', error);
      return NextResponse.json(
        { error: '获取积分失败' },
        { status: 500 }
      );
    }

    const result = (data as GetCreditsResult[])?.[0];
    if (!result) {
      // Profile might not exist yet - return defaults
      return NextResponse.json({
        credits: 10,
        checkedInToday: false,
        bonusAwarded: false,
      });
    }

    return NextResponse.json({
      credits: result.credits,
      checkedInToday: result.checked_in_today,
      bonusAwarded: result.bonus_awarded,
    });
  } catch (error) {
    console.error('Credits API error:', error);
    return NextResponse.json(
      { error: '获取积分失败' },
      { status: 500 }
    );
  }
}
