/**
 * OAuth Callback Route
 *
 * Handles OAuth provider redirects (Google, Twitter/X)
 * Exchanges auth code for session and redirects to home
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('OAuth callback error:', error);
      // Redirect to home with error
      return NextResponse.redirect(`${origin}/?error=auth_failed`);
    }
  }

  // Redirect to home page after successful auth
  return NextResponse.redirect(origin);
}
