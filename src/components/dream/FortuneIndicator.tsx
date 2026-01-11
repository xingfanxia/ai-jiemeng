'use client';

import { Star, ThumbsUp, Minus, AlertTriangle, AlertOctagon } from 'lucide-react';
import type { FortuneType } from '@/lib/knowledge/fortune';
import { FORTUNE_TYPES } from '@/lib/knowledge/fortune';

/**
 * Fortune icon mapping
 */
const FORTUNE_ICONS: Record<FortuneType, React.ElementType> = {
  da_ji: Star,
  ji: ThumbsUp,
  zhong_ping: Minus,
  xiong: AlertTriangle,
  da_xiong: AlertOctagon,
};

/**
 * Fortune display classes for consistent theming
 */
const FORTUNE_CLASSES: Record<FortuneType, { bg: string; text: string; border: string }> = {
  da_ji: {
    bg: 'bg-red-50 dark:bg-red-950/30',
    text: 'text-red-600 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800',
  },
  ji: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-200 dark:border-amber-800',
  },
  zhong_ping: {
    bg: 'bg-gray-50 dark:bg-gray-800/30',
    text: 'text-gray-600 dark:text-gray-400',
    border: 'border-gray-200 dark:border-gray-700',
  },
  xiong: {
    bg: 'bg-slate-50 dark:bg-slate-800/30',
    text: 'text-slate-600 dark:text-slate-400',
    border: 'border-slate-200 dark:border-slate-700',
  },
  da_xiong: {
    bg: 'bg-slate-100 dark:bg-slate-900/50',
    text: 'text-slate-700 dark:text-slate-300',
    border: 'border-slate-300 dark:border-slate-600',
  },
};

interface FortuneIndicatorProps {
  /** Fortune type to display */
  fortune: FortuneType;
  /** Show description text */
  showDescription?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional class names */
  className?: string;
}

export function FortuneIndicator({
  fortune,
  showDescription = false,
  size = 'md',
  className = '',
}: FortuneIndicatorProps) {
  const config = FORTUNE_TYPES[fortune];
  const classes = FORTUNE_CLASSES[fortune];
  const Icon = FORTUNE_ICONS[fortune];

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Fortune Badge */}
      <div
        className={`
          inline-flex items-center gap-1.5 rounded-full font-medium
          ${classes.bg} ${classes.text} ${classes.border} border
          ${sizeClasses[size]}
        `}
      >
        <Icon className={iconSizes[size]} />
        <span>{config.label}</span>
      </div>

      {/* Description */}
      {showDescription && (
        <p className={`${classes.text} text-sm opacity-80`}>{config.description}</p>
      )}
    </div>
  );
}

/**
 * Compact fortune badge for inline use
 */
export function FortuneBadge({
  fortune,
  className = '',
}: {
  fortune: FortuneType;
  className?: string;
}) {
  const config = FORTUNE_TYPES[fortune];
  const classes = FORTUNE_CLASSES[fortune];
  const Icon = FORTUNE_ICONS[fortune];

  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
        ${classes.bg} ${classes.text} ${classes.border} border
        ${className}
      `}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}

export default FortuneIndicator;
