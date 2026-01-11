'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X } from 'lucide-react';
import { onCheckInBonus } from './AuthProvider';

export function CheckInBonusToast() {
  const [show, setShow] = useState(false);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    const unsubscribe = onCheckInBonus((newCredits) => {
      setCredits(newCredits);
      setShow(true);
      // Auto-hide after 4 seconds
      setTimeout(() => setShow(false), 4000);
    });

    return unsubscribe;
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto"
        >
          <div className="relative flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-2xl shadow-indigo-500/30">
            {/* Close button */}
            <button
              onClick={() => setShow(false)}
              className="absolute -top-2 -right-2 p-1 bg-white dark:bg-zinc-800 rounded-full shadow-md hover:scale-110 transition-transform"
            >
              <X className="w-3.5 h-3.5 text-zinc-500" />
            </button>

            {/* Gift icon with animation */}
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
            </motion.div>

            {/* Text */}
            <div className="text-white">
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="font-bold text-lg"
              >
                Daily Bonus Claimed!
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-white/90"
              >
                +2 credits - Total: {credits}
              </motion.p>
            </div>

            {/* Sparkle effect */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="absolute -top-1 -right-1 text-2xl"
            >
              *
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
