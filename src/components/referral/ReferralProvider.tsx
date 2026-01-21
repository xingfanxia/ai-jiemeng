'use client';

import { useState, Suspense } from 'react';
import { useReferralCapture } from '@/hooks/useReferralCapture';
import { ReferralBanner } from './ReferralBanner';
import { ReferralAnnouncementBanner } from './ReferralAnnouncementBanner';
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

export function ReferralProvider({
  children,
  appName = '解梦猫',
  sourceApp = 'jiemeng',
}: ReferralProviderProps) {
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);

  return (
    <>
      {/* Capture referral code from URL */}
      <Suspense fallback={null}>
        <ReferralCapture sourceApp={sourceApp} />
      </Suspense>

      {/* One-time announcement banner for referral feature */}
      <ReferralAnnouncementBanner onOpenReferralModal={() => setIsReferralModalOpen(true)} />

      {/* Referral banner CTA */}
      <ReferralBanner onOpenReferralModal={() => setIsReferralModalOpen(true)} />

      {/* Main content */}
      {children}

      {/* Referral modal (controlled by banner) */}
      <ReferralModal
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
        appName={appName}
      />
    </>
  );
}
