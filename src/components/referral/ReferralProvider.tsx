'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useReferralCapture } from '@/hooks/useReferralCapture';
import { useAuth } from '@/components/auth/AuthProvider';
import { AuthModal } from '@/components/auth/AuthModal';
import { ReferralBanner } from './ReferralBanner';
import { ReferralAnnouncementBanner } from './ReferralAnnouncementBanner';
import { ReferralWelcomeBanner } from './ReferralWelcomeBanner';
import { ReferralModal } from './ReferralModal';

interface ReferralProviderProps {
  children: React.ReactNode;
  appName?: string;
  sourceApp?: string;
}

function ReferralCapture({ sourceApp }: { sourceApp: string }) {
  useReferralCapture(sourceApp);
  return null;
}

/**
 * Inner component that handles referral welcome experience
 * Needs to be inside Suspense due to useSearchParams
 */
function ReferralWelcomeHandler({
  onOpenSignup,
}: {
  onOpenSignup: () => void;
}) {
  const { user, isLoading: isAuthLoading } = useAuth();
  const searchParams = useSearchParams();
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [isAutoOpening, setIsAutoOpening] = useState(false);

  // Determine if we should auto-open (check conditions early)
  useEffect(() => {
    if (isAuthLoading) return;
    if (user) return;
    if (hasAutoOpened) return;

    const refCode = searchParams.get('ref');
    if (!refCode) return;

    const autoOpenedKey = `xuanxue_referral_auto_opened_${refCode}`;
    if (sessionStorage.getItem(autoOpenedKey)) return;

    // We will auto-open - set flag immediately to prevent banner flash
    setIsAutoOpening(true);
  }, [user, isAuthLoading, searchParams, hasAutoOpened]);

  // Auto-open signup modal when arriving via referral link
  useEffect(() => {
    // Wait for auth to finish loading
    if (isAuthLoading) return;

    // Don't auto-open if user is already logged in
    if (user) return;

    // Don't auto-open more than once per session
    if (hasAutoOpened) return;

    // Check if there's a ref param in URL
    const refCode = searchParams.get('ref');
    if (!refCode) return;

    // Check sessionStorage to prevent re-opening on page navigation
    const autoOpenedKey = `xuanxue_referral_auto_opened_${refCode}`;
    if (sessionStorage.getItem(autoOpenedKey)) return;

    // Mark as auto-opened and open the modal
    sessionStorage.setItem(autoOpenedKey, 'true');
    setHasAutoOpened(true);

    // Minimal delay to ensure everything is mounted
    const timer = setTimeout(() => {
      onOpenSignup();
    }, 100);

    return () => clearTimeout(timer);
  }, [user, isAuthLoading, searchParams, hasAutoOpened, onOpenSignup]);

  return (
    <ReferralWelcomeBanner onOpenSignup={onOpenSignup} isAutoOpening={isAutoOpening} />
  );
}

export function ReferralProvider({
  children,
  appName = '解梦猫',
  sourceApp = 'jiemeng',
}: ReferralProviderProps) {
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleOpenSignup = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <>
      {/* Capture referral code from URL */}
      <Suspense fallback={null}>
        <ReferralCapture sourceApp={sourceApp} />
      </Suspense>

      {/* Welcome banner for referred users (non-logged-in) */}
      <Suspense fallback={null}>
        <ReferralWelcomeHandler onOpenSignup={handleOpenSignup} />
      </Suspense>

      {/* One-time announcement banner for referral feature */}
      <ReferralAnnouncementBanner onOpenReferralModal={() => setIsReferralModalOpen(true)} />

      {/* Referral banner CTA (for logged-in users) */}
      <ReferralBanner onOpenReferralModal={() => setIsReferralModalOpen(true)} />

      {/* Main content */}
      {children}

      {/* Referral modal (controlled by banner) */}
      <ReferralModal
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
        appName={appName}
      />

      {/* Auth modal for referral signup */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode="signup"
      />
    </>
  );
}
