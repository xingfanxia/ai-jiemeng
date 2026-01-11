'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, BookOpen, Brain } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { DreamSymbol, DreamSymbolCategory } from '@/lib/types/dream';
import { getCategoryById, DREAM_CATEGORIES } from '@/lib/knowledge/categories';

/**
 * Category color mapping for visual distinction
 */
const CATEGORY_COLORS: Record<DreamSymbolCategory, { bg: string; text: string; border: string }> = {
  nature: {
    bg: 'bg-green-50 dark:bg-green-950/30',
    text: 'text-green-600 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800',
  },
  animals: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-200 dark:border-amber-800',
  },
  people: {
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800',
  },
  objects: {
    bg: 'bg-orange-50 dark:bg-orange-950/30',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-800',
  },
  places: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
  },
  actions: {
    bg: 'bg-cyan-50 dark:bg-cyan-950/30',
    text: 'text-cyan-600 dark:text-cyan-400',
    border: 'border-cyan-200 dark:border-cyan-800',
  },
  emotions: {
    bg: 'bg-pink-50 dark:bg-pink-950/30',
    text: 'text-pink-600 dark:text-pink-400',
    border: 'border-pink-200 dark:border-pink-800',
  },
  abstract: {
    bg: 'bg-indigo-50 dark:bg-indigo-950/30',
    text: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-200 dark:border-indigo-800',
  },
  body: {
    bg: 'bg-rose-50 dark:bg-rose-950/30',
    text: 'text-rose-600 dark:text-rose-400',
    border: 'border-rose-200 dark:border-rose-800',
  },
  colors: {
    bg: 'bg-violet-50 dark:bg-violet-950/30',
    text: 'text-violet-600 dark:text-violet-400',
    border: 'border-violet-200 dark:border-violet-800',
  },
  numbers: {
    bg: 'bg-slate-50 dark:bg-slate-800/30',
    text: 'text-slate-600 dark:text-slate-400',
    border: 'border-slate-200 dark:border-slate-700',
  },
};

/**
 * Significance indicator styles
 */
const SIGNIFICANCE_STYLES: Record<DreamSymbol['significance'], { dot: string; label: string }> = {
  high: { dot: 'bg-red-500', label: '核心意象' },
  medium: { dot: 'bg-amber-500', label: '重要意象' },
  low: { dot: 'bg-gray-400', label: '次要意象' },
};

/**
 * Map DreamSymbolCategory to Chinese category name
 */
function getCategoryLabel(category: DreamSymbolCategory): string {
  // Find matching category from DREAM_CATEGORIES
  for (const cat of DREAM_CATEGORIES) {
    for (const sub of cat.subcategories) {
      if (sub.id === category || cat.id === category) {
        return cat.name;
      }
    }
  }

  // Fallback mapping
  const fallbackMap: Record<DreamSymbolCategory, string> = {
    nature: '天象类',
    animals: '动物类',
    people: '人物类',
    objects: '器物类',
    places: '建筑类',
    actions: '活动类',
    emotions: '情感类',
    abstract: '特殊类',
    body: '身体类',
    colors: '器物类',
    numbers: '特殊类',
  };

  return fallbackMap[category] || '其他';
}

interface SymbolCardProps {
  /** The symbol to display */
  symbol: DreamSymbol;
  /** Compact mode for inline display */
  compact?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional class names */
  className?: string;
}

export function SymbolCard({ symbol, compact = false, onClick, className = '' }: SymbolCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const colors = CATEGORY_COLORS[symbol.category] || CATEGORY_COLORS.abstract;
  const significance = SIGNIFICANCE_STYLES[symbol.significance];
  const categoryLabel = getCategoryLabel(symbol.category);

  // Compact tag style
  if (compact) {
    return (
      <button
        onClick={() => onClick?.() || setIsExpanded(!isExpanded)}
        className={`
          inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm
          ${colors.bg} ${colors.text} ${colors.border} border
          hover:shadow-sm transition-all touch-feedback
          ${className}
        `}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${significance.dot}`} />
        <span className="font-medium">{symbol.name}</span>
      </button>
    );
  }

  // Full card style
  return (
    <Card
      className={`
        symbol-card cursor-pointer transition-all hover:shadow-md
        ${colors.border} border
        ${className}
      `}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardContent className="p-4">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {/* Significance Dot */}
            <span
              className={`w-2 h-2 rounded-full ${significance.dot}`}
              title={significance.label}
            />

            {/* Symbol Name */}
            <h3 className="font-semibold text-foreground">{symbol.name}</h3>

            {/* Category Badge */}
            <span
              className={`
                text-xs px-2 py-0.5 rounded-full
                ${colors.bg} ${colors.text}
              `}
            >
              {categoryLabel}
            </span>
          </div>

          {/* Expand/Collapse Toggle */}
          <button
            className="p-1 rounded-full hover:bg-secondary/50 transition-colors"
            aria-label={isExpanded ? '收起' : '展开'}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>

        {/* Brief Meaning - Always Visible */}
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{symbol.meaning}</p>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border space-y-4">
            {/* Traditional Meaning */}
            {symbol.traditionalMeaning && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-400">
                  <BookOpen className="w-4 h-4" />
                  <span>周公解梦</span>
                </div>
                <p className="text-sm text-foreground/80 pl-6">{symbol.traditionalMeaning}</p>
              </div>
            )}

            {/* Psychological Meaning */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                <Brain className="w-4 h-4" />
                <span>心理解读</span>
              </div>
              <p className="text-sm text-foreground/80 pl-6">{symbol.meaning}</p>
            </div>

            {/* Significance */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="w-3 h-3" />
              <span>
                重要性：
                <span className={`font-medium ${colors.text}`}>{significance.label}</span>
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Grid of symbol cards
 */
export function SymbolGrid({
  symbols,
  className = '',
}: {
  symbols: DreamSymbol[];
  className?: string;
}) {
  if (symbols.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">暂无解析到的梦境意象</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-4 sm:grid-cols-2 ${className}`}>
      {symbols.map((symbol, idx) => (
        <SymbolCard key={`${symbol.name}-${idx}`} symbol={symbol} />
      ))}
    </div>
  );
}

export default SymbolCard;
