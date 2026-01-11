/**
 * Credits API Route
 *
 * GET /api/credits
 * Returns user's credit balance and check-in status
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

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

    // Get user profile with credits
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: profile, error } = await (supabase
      .from('user_profiles') as any)
      .select('credits, last_check_in')
      .eq('id', user.id)
      .single();

    if (error || !profile) {
      // New user - create profile with initial credits
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: newProfile, error: createError } = await (supabase
        .from('user_profiles') as any)
        .insert({
          id: user.id,
          credits: 10,
          last_check_in: null,
        })
        .select('credits, last_check_in')
        .single();

      if (createError) {
        console.error('Failed to create profile:', createError);
        return NextResponse.json({
          credits: 10,
          checkedInToday: false,
          bonusAwarded: false,
        });
      }

      return NextResponse.json({
        credits: newProfile?.credits ?? 10,
        checkedInToday: false,
        bonusAwarded: false,
      });
    }

    // Check if already checked in today
    const today = new Date().toISOString().split('T')[0];
    const lastCheckIn = profile.last_check_in?.split('T')[0];
    const checkedInToday = lastCheckIn === today;

    // Award daily check-in bonus if not already checked in
    let bonusAwarded = false;
    let currentCredits = profile.credits;

    if (!checkedInToday) {
      const bonusCredits = 2;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: updateError } = await (supabase
        .from('user_profiles') as any)
        .update({
          credits: currentCredits + bonusCredits,
          last_check_in: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (!updateError) {
        currentCredits += bonusCredits;
        bonusAwarded = true;
      }
    }

    return NextResponse.json({
      credits: currentCredits,
      checkedInToday: true,
      bonusAwarded,
    });
  } catch (error) {
    console.error('Credits API error:', error);
    return NextResponse.json(
      { error: '获取积分失败' },
      { status: 500 }
    );
  }
}
