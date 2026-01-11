/**
 * Dream Interpretation Knowledge Base - Fortune Calculation
 *
 * Defines fortune types, scoring system, and calculation helpers
 * based on traditional Chinese dream interpretation.
 */

// ==================== Type Definitions ====================

/**
 * Fortune type enum - Traditional Chinese classification
 */
export type FortuneType =
  | 'da_ji'      // 大吉 - Great Fortune
  | 'ji'         // 吉 - Fortune
  | 'zhong_ping' // 中平 - Neutral
  | 'xiong'      // 凶 - Misfortune
  | 'da_xiong';  // 大凶 - Great Misfortune

/**
 * Fortune aspect categories
 */
export type FortuneAspect =
  | 'overall'    // 总体运势
  | 'wealth'     // 财运
  | 'career'     // 事业
  | 'health'     // 健康
  | 'love'       // 感情
  | 'family'     // 家庭
  | 'travel'     // 出行
  | 'study';     // 学业

/**
 * Fortune result with score and interpretation
 */
export interface FortuneResult {
  /** Fortune type classification */
  type: FortuneType;
  /** Numerical score (0-100) */
  score: number;
  /** Chinese label */
  label: string;
  /** English label */
  labelEn: string;
  /** Associated color (for UI) */
  color: string;
  /** Associated icon (for UI) */
  icon: string;
  /** Brief description */
  description: string;
  /** English description */
  descriptionEn: string;
}

/**
 * Multi-aspect fortune breakdown
 */
export interface FortuneBreakdown {
  /** Overall fortune */
  overall: FortuneResult;
  /** Aspect-specific fortunes */
  aspects: Partial<Record<FortuneAspect, FortuneResult>>;
  /** Additional advice or warnings */
  advice?: string;
}

// ==================== Fortune Type Definitions ====================

/**
 * Fortune type details with score ranges
 */
export const FORTUNE_TYPES: Record<FortuneType, {
  label: string;
  labelEn: string;
  scoreRange: { min: number; max: number };
  color: string;
  icon: string;
  description: string;
  descriptionEn: string;
}> = {
  da_ji: {
    label: '大吉',
    labelEn: 'Great Fortune',
    scoreRange: { min: 85, max: 100 },
    color: '#dc2626', // Red (traditional lucky color)
    icon: 'Star',
    description: '诸事大吉，万事如意，运势极佳',
    descriptionEn: 'Everything goes smoothly, extremely auspicious',
  },
  ji: {
    label: '吉',
    labelEn: 'Fortune',
    scoreRange: { min: 65, max: 84 },
    color: '#f97316', // Orange
    icon: 'ThumbsUp',
    description: '吉祥如意，运势良好，可顺利行事',
    descriptionEn: 'Auspicious, good fortune, proceed with confidence',
  },
  zhong_ping: {
    label: '中平',
    labelEn: 'Neutral',
    scoreRange: { min: 40, max: 64 },
    color: '#eab308', // Yellow
    icon: 'Minus',
    description: '平平无奇，无大吉凶，宜稳中求进',
    descriptionEn: 'Neither good nor bad, proceed with caution',
  },
  xiong: {
    label: '凶',
    labelEn: 'Misfortune',
    scoreRange: { min: 20, max: 39 },
    color: '#6b7280', // Gray
    icon: 'AlertTriangle',
    description: '有所不顺，宜谨慎行事，多加留意',
    descriptionEn: 'Some obstacles ahead, be cautious and attentive',
  },
  da_xiong: {
    label: '大凶',
    labelEn: 'Great Misfortune',
    scoreRange: { min: 0, max: 19 },
    color: '#1f2937', // Dark gray (not pure black)
    icon: 'AlertOctagon',
    description: '诸事不宜，宜静不宜动，需特别注意',
    descriptionEn: 'Unfavorable for most activities, extra caution needed',
  },
};

/**
 * Fortune aspect labels
 */
export const FORTUNE_ASPECTS: Record<FortuneAspect, {
  label: string;
  labelEn: string;
  icon: string;
}> = {
  overall: { label: '总体运势', labelEn: 'Overall', icon: 'Compass' },
  wealth: { label: '财运', labelEn: 'Wealth', icon: 'Coins' },
  career: { label: '事业', labelEn: 'Career', icon: 'Briefcase' },
  health: { label: '健康', labelEn: 'Health', icon: 'Heart' },
  love: { label: '感情', labelEn: 'Love', icon: 'HeartHandshake' },
  family: { label: '家庭', labelEn: 'Family', icon: 'Home' },
  travel: { label: '出行', labelEn: 'Travel', icon: 'Plane' },
  study: { label: '学业', labelEn: 'Study', icon: 'GraduationCap' },
};

// ==================== Helper Functions ====================

/**
 * Convert score to fortune type
 */
export function scoreToFortuneType(score: number): FortuneType {
  // Clamp score to valid range
  const clampedScore = Math.max(0, Math.min(100, score));

  for (const [type, config] of Object.entries(FORTUNE_TYPES)) {
    if (clampedScore >= config.scoreRange.min && clampedScore <= config.scoreRange.max) {
      return type as FortuneType;
    }
  }

  // Default to neutral if something goes wrong
  return 'zhong_ping';
}

/**
 * Convert fortune type to representative score
 */
export function fortuneTypeToScore(type: FortuneType): number {
  const config = FORTUNE_TYPES[type];
  // Return the middle of the range
  return Math.round((config.scoreRange.min + config.scoreRange.max) / 2);
}

/**
 * Create a fortune result from a score
 */
export function createFortuneResult(score: number): FortuneResult {
  const type = scoreToFortuneType(score);
  const config = FORTUNE_TYPES[type];

  return {
    type,
    score: Math.round(Math.max(0, Math.min(100, score))),
    label: config.label,
    labelEn: config.labelEn,
    color: config.color,
    icon: config.icon,
    description: config.description,
    descriptionEn: config.descriptionEn,
  };
}

/**
 * Create a fortune result from a type
 */
export function createFortuneResultFromType(type: FortuneType): FortuneResult {
  const config = FORTUNE_TYPES[type];
  const score = fortuneTypeToScore(type);

  return {
    type,
    score,
    label: config.label,
    labelEn: config.labelEn,
    color: config.color,
    icon: config.icon,
    description: config.description,
    descriptionEn: config.descriptionEn,
  };
}

/**
 * Parse Chinese fortune string to fortune type
 * Handles common variations in text
 */
export function parseChineseFortuneString(text: string): FortuneType | null {
  const normalizedText = text.trim().toLowerCase();

  // Check for specific patterns
  if (normalizedText.includes('大吉') || normalizedText.includes('极吉')) {
    return 'da_ji';
  }
  if (normalizedText.includes('大凶') || normalizedText.includes('极凶')) {
    return 'da_xiong';
  }
  if (normalizedText === '吉' || normalizedText.includes('小吉') || normalizedText.includes('中吉')) {
    return 'ji';
  }
  if (normalizedText === '凶' || normalizedText.includes('小凶') || normalizedText.includes('中凶')) {
    return 'xiong';
  }
  if (normalizedText.includes('中平') || normalizedText.includes('平') || normalizedText.includes('半吉半凶')) {
    return 'zhong_ping';
  }

  return null;
}

/**
 * Calculate weighted average fortune score from multiple interpretations
 */
export function calculateWeightedFortune(
  interpretations: Array<{ score: number; weight: number }>
): number {
  if (interpretations.length === 0) return 50; // Default neutral

  const totalWeight = interpretations.reduce((sum, int) => sum + int.weight, 0);
  if (totalWeight === 0) return 50;

  const weightedSum = interpretations.reduce(
    (sum, int) => sum + int.score * int.weight,
    0
  );

  return Math.round(weightedSum / totalWeight);
}

/**
 * Combine multiple fortune results into an overall assessment
 */
export function combineFortuneResults(results: FortuneResult[]): FortuneResult {
  if (results.length === 0) {
    return createFortuneResult(50);
  }

  const averageScore = Math.round(
    results.reduce((sum, r) => sum + r.score, 0) / results.length
  );

  return createFortuneResult(averageScore);
}

/**
 * Get fortune display text (for showing to users)
 */
export function getFortuneDisplayText(fortune: FortuneResult, locale: 'zh' | 'en' = 'zh'): string {
  if (locale === 'en') {
    return `${fortune.labelEn} (${fortune.score}/100) - ${fortune.descriptionEn}`;
  }
  return `${fortune.label}（${fortune.score}分）- ${fortune.description}`;
}

/**
 * Check if fortune is generally positive
 */
export function isPositiveFortune(fortune: FortuneResult | FortuneType): boolean {
  const type = typeof fortune === 'string' ? fortune : fortune.type;
  return type === 'da_ji' || type === 'ji';
}

/**
 * Check if fortune is generally negative
 */
export function isNegativeFortune(fortune: FortuneResult | FortuneType): boolean {
  const type = typeof fortune === 'string' ? fortune : fortune.type;
  return type === 'xiong' || type === 'da_xiong';
}

/**
 * Get modifier text for context-adjusted fortune
 * E.g., "孕妇梦此" increases score for certain symbols
 */
export function getFortuneModifier(
  baseFortune: FortuneResult,
  modifier: number
): FortuneResult {
  const newScore = Math.max(0, Math.min(100, baseFortune.score + modifier));
  return createFortuneResult(newScore);
}

/**
 * Traditional "反梦" (reverse dream) fortune calculation
 * In some cases, dreaming of misfortune indicates good luck
 */
export function applyReverseDreamLogic(fortune: FortuneResult): FortuneResult {
  // Reverse the score: 0->100, 100->0
  const reversedScore = 100 - fortune.score;
  return createFortuneResult(reversedScore);
}

/**
 * Get fortune comparison between two results
 */
export function compareFortuneResults(
  a: FortuneResult,
  b: FortuneResult
): 'better' | 'worse' | 'same' {
  const diff = a.score - b.score;
  if (Math.abs(diff) < 5) return 'same';
  return diff > 0 ? 'better' : 'worse';
}

// ==================== Fortune Score Presets ====================

/**
 * Common fortune score presets for quick reference
 */
export const FORTUNE_PRESETS = {
  // 大吉
  EXCELLENT: 95,
  VERY_GOOD: 90,
  GREAT: 85,

  // 吉
  GOOD: 80,
  FAVORABLE: 75,
  POSITIVE: 70,
  SLIGHTLY_GOOD: 65,

  // 中平
  NEUTRAL: 55,
  AVERAGE: 50,
  SLIGHTLY_BAD: 45,
  UNCERTAIN: 40,

  // 凶
  UNFAVORABLE: 35,
  NEGATIVE: 30,
  BAD: 25,
  CHALLENGING: 20,

  // 大凶
  VERY_BAD: 15,
  TERRIBLE: 10,
  WORST: 5,
} as const;

// ==================== Aspect-Specific Fortune Adjustments ====================

/**
 * Symbol-to-aspect mapping for determining which aspects are affected
 * This helps calculate aspect-specific fortunes
 */
export const SYMBOL_ASPECT_WEIGHTS: Record<string, Partial<Record<FortuneAspect, number>>> = {
  // Money/wealth related symbols
  money: { wealth: 1.5, career: 0.8 },
  gold: { wealth: 1.5, career: 0.5 },
  fish: { wealth: 1.2, family: 0.8 },

  // Career related symbols
  promotion: { career: 1.5, wealth: 0.8 },
  office: { career: 1.2 },
  exam: { study: 1.5, career: 0.8 },

  // Health related symbols
  hospital: { health: 1.5 },
  medicine: { health: 1.3 },
  teeth: { health: 1.2 },

  // Love/relationship related symbols
  wedding: { love: 1.5, family: 1.0 },
  kiss: { love: 1.5 },
  spouse: { love: 1.2, family: 1.0 },

  // Family related symbols
  baby: { family: 1.5, health: 0.8 },
  parents: { family: 1.3 },
  home: { family: 1.2, wealth: 0.5 },

  // Travel related symbols
  airplane: { travel: 1.5 },
  train: { travel: 1.3 },
  road: { travel: 1.2 },
};

/**
 * Calculate aspect-specific fortune adjustments based on symbol
 */
export function calculateAspectFortunes(
  baseScore: number,
  symbolKey: string
): Partial<Record<FortuneAspect, FortuneResult>> {
  const weights = SYMBOL_ASPECT_WEIGHTS[symbolKey] || {};
  const result: Partial<Record<FortuneAspect, FortuneResult>> = {};

  for (const [aspect, weight] of Object.entries(weights)) {
    // Apply weight to adjust the score
    const adjustedScore = Math.round(baseScore * (weight as number));
    const clampedScore = Math.max(0, Math.min(100, adjustedScore));
    result[aspect as FortuneAspect] = createFortuneResult(clampedScore);
  }

  return result;
}
