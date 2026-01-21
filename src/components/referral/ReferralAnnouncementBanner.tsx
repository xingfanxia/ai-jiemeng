'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';

const ANNOUNCEMENT_DISMISSED_KEY = 'referral_announcement_dismissed';

interface ReferralAnnouncementBannerProps {
  onOpenReferralModal: () => void;
}

export function ReferralAnnouncementBanner({ onOpenReferralModal }: ReferralAnnouncementBannerProps) {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show if user is logged in and not dismissed
    const isDismissed = localStorage.getItem(ANNOUNCEMENT_DISMISSED_KEY) === 'true';
    if (user && !isDismissed) {
      setIsVisible(true);
    }
  }, [user]);

  const handleDismiss = () => {
    localStorage.setItem(ANNOUNCEMENT_DISMISSED_KEY, 'true');
    setIsVisible(false);
  };

  const handleLearnMore = () => {
    onOpenReferralModal();
    handleDismiss();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white rounded-lg mx-4 mt-4 shadow-lg"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3 flex-1">
            <span className="text-lg">🎉</span>
            <span className="text-sm font-medium">
              新功能上线！邀请好友，双方各得20积分！
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLearnMore}
              className="px-3 py-1 text-sm font-medium bg-white/20 hover:bg-white/30 rounded-md transition-colors"
            >
              了解更多
            </button>

            <button
              onClick={handleDismiss}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              aria-label="关闭"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
