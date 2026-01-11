'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Info, Gift } from 'lucide-react';
import { useAuth } from './AuthProvider';

interface CreditsBadgeProps {
  className?: string;
  showTooltip?: boolean;
}

export function CreditsBadge({ className = '', showTooltip = true }: CreditsBadgeProps) {
  const { credits, isCreditsLoading, user } = useAuth();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  // Don't show if not logged in
  if (!user) return null;

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => showTooltip && setIsTooltipOpen(!isTooltipOpen)}
        onMouseEnter={() => showTooltip && setIsTooltipOpen(true)}
        onMouseLeave={() => showTooltip && setIsTooltipOpen(false)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 transition-colors hover:bg-indigo-200 dark:hover:bg-indigo-900/50"
      >
        <Coins className="w-4 h-4" />
        <motion.span
          key={credits.credits}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-sm font-medium min-w-[1.25rem] text-center"
        >
          {isCreditsLoading ? '...' : credits.credits}
        </motion.span>
      </button>

      {/* Tooltip */}
      <AnimatePresence>
        {isTooltipOpen && showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute right-0 top-full mt-2 w-52 p-3 bg-card rounded-lg shadow-lg border border-border z-50"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Info className="w-4 h-4 text-muted-foreground" />
                Credits Info
              </div>

              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Current Credits</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                    {credits.credits}
                  </span>
                </div>

                {credits.checkedInToday ? (
                  <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400 text-xs">
                    <Gift className="w-3.5 h-3.5" />
                    Daily bonus claimed +2
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                    <Gift className="w-3.5 h-3.5" />
                    Use any feature to claim +2 daily bonus
                  </div>
                )}
              </div>

              <p className="text-xs text-muted-foreground pt-1 border-t border-border">
                New users get 10 credits, +2 daily bonus
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
