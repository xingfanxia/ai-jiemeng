'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const REFERRAL_CODE_KEY = 'xuanxue_pending_referral';
const REFERRAL_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days (for manual entry window)

interface PendingReferral {
  code: string;
  sourceApp: string;
  capturedAt: number;
}

/**
 * Hook to capture referral codes from URL and store in localStorage
 * The captured code is used to pre-fill signup forms and OAuth flows.
 * 
 * Usage: Add to your app's root layout or main page component
 *
 * Example: https://jiemeng.panpanmao.com/?ref=PPM-ABC123
 */
export function useReferralCapture(sourceApp: string = 'jiemeng') {
  const searchParams = useSearchParams();

  useEffect(() => {
    const refCode = searchParams.get('ref');
    if (refCode && refCode.trim()) {
      const data: PendingReferral = {
        code: refCode.trim().toUpperCase(),
        sourceApp,
        capturedAt: Date.now(),
      };
      localStorage.setItem(REFERRAL_CODE_KEY, JSON.stringify(data));

      // Clean URL without refreshing page (optional UX improvement)
      const url = new URL(window.location.href);
      url.searchParams.delete('ref');
      window.history.replaceState({}, '', url.toString());
    }
  }, [searchParams, sourceApp]);
}

/**
 * Get pending referral from localStorage (if not expired)
 * Used by signup forms to pre-fill referral code
 */
export function getPendingReferral(): PendingReferral | null {
  try {
    const stored = localStorage.getItem(REFERRAL_CODE_KEY);
    if (!stored) return null;

    const data: PendingReferral = JSON.parse(stored);

    // Check if expired (7 days)
    if (Date.now() - data.capturedAt > REFERRAL_EXPIRY_MS) {
      localStorage.removeItem(REFERRAL_CODE_KEY);
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

/**
 * Clear pending referral from localStorage
 * Called after successful referral linking
 */
export function clearPendingReferral(): void {
  localStorage.removeItem(REFERRAL_CODE_KEY);
}
