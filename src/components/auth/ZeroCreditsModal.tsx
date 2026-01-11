'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Coins, Sparkles, Bell, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ZeroCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkedInToday: boolean;
}

export function ZeroCreditsModal({ isOpen, onClose, checkedInToday }: ZeroCreditsModalProps) {
  const [hasClickedRecharge, setHasClickedRecharge] = useState(false);
  const [rushDevClicks, setRushDevClicks] = useState(0);
  const [isRushing, setIsRushing] = useState(false);
  const [isTracking, setIsTracking] = useState(false);

  // Clear state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setRushDevClicks(0);
      setIsRushing(false);
    }
  }, [isOpen]);

  const trackInterest = async (feature: 'recharge' | 'rush_dev') => {
    setIsTracking(true);
    try {
      await fetch('/api/track-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feature }),
      });

      if (feature === 'recharge') {
        setHasClickedRecharge(true);
      } else {
        setRushDevClicks(prev => prev + 1);
        setIsRushing(true);
        setTimeout(() => setIsRushing(false), 1500);
      }
    } catch (e) {
      console.error('Failed to track interest:', e);
    } finally {
      setIsTracking(false);
    }
  };

  // Don't render on server
  if (typeof window === 'undefined') return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 pb-4 text-center bg-gradient-to-b from-indigo-500/10 to-transparent">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <Coins className="w-8 h-8 text-indigo-500" />
              </div>

              <h2 className="text-xl font-bold text-foreground">Out of Credits</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Your credits have been used up. Get more to continue interpreting dreams.
              </p>
            </div>

            {/* Options */}
            <div className="p-6 space-y-4">
              {/* Daily Check-in Option */}
              <div className="p-4 rounded-xl border border-border bg-secondary/30">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">Daily Bonus</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {checkedInToday
                        ? 'Already claimed today. Come back tomorrow for +2 credits.'
                        : 'Use any feature to claim +2 daily credits.'}
                    </p>
                    {checkedInToday && (
                      <p className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Claimed today
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Recharge Option (Coming Soon) */}
              <div className="p-4 rounded-xl border border-border bg-secondary/30">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground">Purchase Credits</h3>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                        Coming Soon
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Unlock unlimited dream interpretations with premium credits.
                    </p>

                    {!hasClickedRecharge ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={() => trackInterest('recharge')}
                        disabled={isTracking}
                      >
                        <Bell className="w-4 h-4 mr-1" />
                        Notify me when available
                      </Button>
                    ) : (
                      <p className="text-xs text-primary mt-3 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        We will notify you when this is available
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Rush Dev Button */}
              <div className="text-center pt-2 min-h-[60px] flex flex-col items-center justify-center">
                <button
                  onClick={() => trackInterest('rush_dev')}
                  disabled={isTracking}
                  className="text-sm px-4 py-2 rounded-lg border-2 border-dashed border-border hover:border-solid hover:border-indigo-500 hover:text-indigo-600 bg-secondary/30 transition-all cursor-pointer"
                >
                  Rush the developers to launch payments
                  {rushDevClicks > 0 && (
                    <span className="ml-2 text-xs text-primary">x{rushDevClicks}</span>
                  )}
                </button>

                <AnimatePresence>
                  {isRushing && (
                    <motion.p
                      initial={{ opacity: 0, y: -10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="text-sm text-primary mt-2 font-medium"
                    >
                      <motion.span
                        animate={{ x: [0, -3, 3, -3, 3, 0] }}
                        transition={{ duration: 0.5, repeat: 2 }}
                      >
                        On it! Working as fast as we can!
                      </motion.span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-secondary/20">
              <Button
                variant="default"
                className="w-full"
                onClick={onClose}
              >
                Got it
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
