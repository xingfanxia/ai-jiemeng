'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X, Sparkles } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/ui/button';
import { getPendingReferral } from '@/hooks/useReferralCapture';

const WELCOME_BANNER_DISMISSED_KEY = 'xuanxue_referral_welcome_dismissed';

interface ReferralWelcomeBannerProps {
  onOpenSignup: () => void;
  isAutoOpening?: boolean; // When true, skip banner display (modal is auto-opening)
}

/**
 * Welcome banner shown to users arriving via referral links
 * Only displays when: URL has ?ref= param AND user is NOT logged in
 * Skips display when modal is auto-opening to prevent flash
 */
export function ReferralWelcomeBanner({ onOpenSignup, isAutoOpening = false }: ReferralWelcomeBannerProps) {
  const { user, isLoading: isAuthLoading } = useAuth();
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // When auto-opening modal, dismiss banner immediately to prevent flash
  useEffect(() => {
    if (isAutoOpening) {
      setIsDismissed(true);
      setIsVisible(false);
    }
  }, [isAutoOpening]);

  // Check if we should show the banner
  useEffect(() => {
    // Skip if auto-opening modal (modal is enough, no need for banner)
    if (isAutoOpening) return;

    // Wait for auth to finish loading
    if (isAuthLoading) return;

    // Don't show if user is logged in
    if (user) {
      setIsVisible(false);
      return;
    }

    // Check if there's a ref param in URL OR pending referral in localStorage
    // This handles the race condition where useReferralCapture may have already
    // removed the ref param from URL and stored it in localStorage
    const refCode = searchParams.get('ref');
    const pendingReferral = getPendingReferral();
    const hasReferralCode = Boolean((refCode && refCode.trim()) || pendingReferral?.code);

    if (!hasReferralCode) {
      setIsVisible(false);
      return;
    }

    // Use the ref code from URL or localStorage for dismiss tracking
    const effectiveRefCode = refCode || pendingReferral?.code;

    // Check if banner was dismissed this session
    const dismissed = sessionStorage.getItem(WELCOME_BANNER_DISMISSED_KEY);
    if (dismissed === effectiveRefCode) {
      setIsDismissed(true);
      setIsVisible(false);
      return;
    }

    // Show the banner
    setIsVisible(true);
  }, [user, isAuthLoading, searchParams, isAutoOpening]);

  const handleDismiss = () => {
    // Get ref code from URL or localStorage for dismiss tracking
    const refCode = searchParams.get('ref');
    const pendingReferral = getPendingReferral();
    const effectiveRefCode = refCode || pendingReferral?.code;

    if (effectiveRefCode) {
      sessionStorage.setItem(WELCOME_BANNER_DISMISSED_KEY, effectiveRefCode);
    }
    setIsDismissed(true);
    setIsVisible(false);
  };

  const handleSignupClick = () => {
    onOpenSignup();
  };

  if (!isVisible || isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 text-white shadow-lg"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3 gap-4">
            {/* Left: Icon and message */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex-shrink-0 p-2 bg-white/20 rounded-full">
                <Gift className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 flex-shrink-0" />
                  <span className="font-semibold text-sm sm:text-base truncate">
                    您已收到好友邀请!
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/90 mt-0.5">
                  注册后双方各得 <b className="text-yellow-300">20积分</b> 奖励
                </p>
              </div>
            </div>

            {/* Right: CTA Button and dismiss */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                onClick={handleSignupClick}
                size="sm"
                className="bg-white text-emerald-700 hover:bg-white/90 font-semibold shadow-md whitespace-nowrap"
              >
                立即注册
              </Button>
              <button
                onClick={handleDismiss}
                className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                aria-label="关闭"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
