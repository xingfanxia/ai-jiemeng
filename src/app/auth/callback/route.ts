/**
 * OAuth Callback Route
 *
 * Handles OAuth provider redirects (Google, Twitter/X)
 * Exchanges auth code for session and redirects to home
 * Also handles referral code linking for new OAuth users
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const refCode = requestUrl.searchParams.get('ref');
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('OAuth callback error:', error);
      // Redirect to home with error
      return NextResponse.redirect(`${origin}/?error=auth_failed`);
    }

    // If referral code was passed, try to link it for new users
    if (refCode && data?.user) {
      try {
        // Call the link_referral function
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error: linkError } = await (supabase.rpc as any)('link_referral', {
          p_referred_user_id: data.user.id,
          p_referral_code: refCode.trim(),
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
  }

  // Redirect to home page after successful auth
  return NextResponse.redirect(origin);
}
