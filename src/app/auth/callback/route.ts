/**
 * Auth Callback Route
 *
 * Handles:
 * 1. OAuth provider redirects (Google, Twitter/X) - uses 'code' param
 * 2. Email confirmation links - uses 'token_hash' and 'type' params
 *
 * Also handles referral code linking for new users:
 * - OAuth: reads 'ref' query param
 * - Email: reads 'referral_code' from user metadata (stored during signup)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * Helper to link referral code for a user
 */
async function linkReferral(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  referralCode: string
) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: linkError } = await (supabase.rpc as any)('link_referral', {
      p_referred_user_id: userId,
      p_referral_code: referralCode.trim(),
      p_source_app: 'jiemeng',
    });

    if (linkError) {
      // Log but don't fail the auth - referral linking is best-effort
      console.log('Referral link attempt:', linkError.message);
    }
  } catch (e) {
    console.error('Failed to link referral:', e);
  }
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const tokenHash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type');
  const refCode = requestUrl.searchParams.get('ref');
  const next = requestUrl.searchParams.get('next');
  const origin = requestUrl.origin;

  const supabase = await createClient();

  // Handle OAuth callback (Google, Twitter/X)
  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('OAuth callback error:', error);
      return NextResponse.redirect(`${origin}/?error=auth_failed`);
    }

    // If referral code was passed via query param, link it
    if (refCode && data?.user) {
      await linkReferral(supabase, data.user.id, refCode);
    }
  }

  // Handle email confirmation (signup, magic link, password recovery)
  if (tokenHash && type) {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as 'signup' | 'email' | 'recovery' | 'invite' | 'magiclink',
    });

    if (error) {
      console.error('Email verification error:', error);
      return NextResponse.redirect(`${origin}/?error=verification_failed`);
    }

    // For email signup, check user metadata for referral code
    if (data?.user && type === 'signup') {
      const referralCode = data.user.user_metadata?.referral_code;
      if (referralCode) {
        await linkReferral(supabase, data.user.id, referralCode);
      }
    }

    // For password recovery, redirect to update-password page
    if (type === 'recovery') {
      return NextResponse.redirect(`${origin}/auth/update-password`);
    }
  }

  // Redirect to next page if specified, otherwise home
  const redirectTo = next ? `${origin}${next}` : origin;
  return NextResponse.redirect(redirectTo);
}
