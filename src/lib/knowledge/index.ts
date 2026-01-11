/**
 * Dream Interpretation Knowledge Base - Unified Export
 *
 * This module provides the central entry point for all dream interpretation
 * knowledge base components including:
 * - AI System Prompts
 * - Dream Symbols
 * - Symbol Categories
 * - Interpretation Conditions
 * - Fortune Calculation
 *
 * @module knowledge
 */

// ==================== AI Prompts ====================
export {
  // System Prompts
  DREAM_INTERPRETATION_SYSTEM_PROMPT,
  DREAM_INTERPRETATION_BRIEF_SYSTEM_PROMPT,
  SYMBOL_INTERPRETATION_SYSTEM_PROMPT,
  PSYCHOLOGICAL_INTERPRETATION_SYSTEM_PROMPT,
  MULTI_PERSPECTIVE_SYSTEM_PROMPT,
  CARDS_INTERPRETATION_SYSTEM_PROMPT,
  // Prompt Generators
  generateDreamInterpretationPrompt,
  generateSymbolLookupPrompt,
  generateFollowUpPrompt,
  // Output Formats
  INTERPRETATION_JSON_FORMAT,
  JSON_OUTPUT_SUFFIX,
  OUTPUT_LENGTH_CONFIG,
  // Sensitive Content
  SENSITIVE_TOPICS,
  detectSensitiveContent,
  // Disclaimers
  INTERPRETATION_DISCLAIMER_ZH,
  INTERPRETATION_DISCLAIMER_EN,
  getDisclaimer,
  // Types
  type InterpretationPromptOptions,
  type DreamInputData,
} from './prompts';

// ==================== Dream Symbols ====================
export {
  // Data
  DREAM_SYMBOLS_DATA,
  DREAM_SYMBOLS,
  SYMBOL_NAME_INDEX,
  // Functions
  getSymbolById,
  getSymbolByName,
  searchSymbols,
  getSymbolsByCategory,
  getAllSymbolIds,
  getSymbolCount,
  // Types
  type DreamSymbol,
  type SymbolInterpretation,
  type InterpretationSource,
  type RelatedSymbol,
} from './symbols';

// ==================== Symbol Categories ====================
export {
  // Data
  DREAM_CATEGORIES,
  CATEGORY_ID_TO_NAME,
  CATEGORY_NAME_TO_ID,
  // Functions
  getCategoryById,
  getCategoryByName,
  getSubcategories,
  findCategoryBySubcategoryId,
  getSortedCategories,
  // Types
  type DreamCategory,
  type DreamSubcategory,
} from './categories';

// ==================== Interpretation Conditions ====================
export {
  // Option Arrays
  GENDER_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  OCCUPATION_OPTIONS,
  SPECIAL_STATUS_OPTIONS,
  TIME_OF_DAY_OPTIONS,
  SEASON_OPTIONS,
  ACTION_OPTIONS,
  COLOR_OPTIONS,
  STATE_OPTIONS,
  // Functions
  getConditionLabel,
  matchesDreamerIdentity,
  formatConditionForDisplay,
  getCurrentTimeOfDay,
  getCurrentSeason,
  getDreamTimeContext,
  // Types
  type DreamerGender,
  type DreamerMaritalStatus,
  type DreamerOccupation,
  type DreamerSpecialStatus,
  type TimeOfDay,
  type Season,
  type DreamAction,
  type DreamColor,
  type DreamState,
  type DreamerIdentity,
  type TimeContext,
  type DreamDetails,
  type InterpretationCondition,
} from './conditions';

// ==================== Fortune Calculation ====================
export {
  // Data
  FORTUNE_TYPES,
  FORTUNE_ASPECTS,
  FORTUNE_PRESETS,
  SYMBOL_ASPECT_WEIGHTS,
  // Functions
  scoreToFortuneType,
  fortuneTypeToScore,
  createFortuneResult,
  createFortuneResultFromType,
  parseChineseFortuneString,
  calculateWeightedFortune,
  combineFortuneResults,
  getFortuneDisplayText,
  isPositiveFortune,
  isNegativeFortune,
  getFortuneModifier,
  applyReverseDreamLogic,
  compareFortuneResults,
  calculateAspectFortunes,
  // Types
  type FortuneType,
  type FortuneAspect,
  type FortuneResult,
  type FortuneBreakdown,
} from './fortune';

// ==================== Convenience Re-exports ====================

/**
 * Quick access to commonly used items
 */
export const Knowledge = {
  // Symbols
  getSymbol: (nameOrId: string) => {
    const { getSymbolById, getSymbolByName } = require('./symbols');
    return getSymbolById(nameOrId) || getSymbolByName(nameOrId);
  },

  // Categories
  getCategoryCount: () => {
    const { DREAM_CATEGORIES } = require('./categories');
    return DREAM_CATEGORIES.length;
  },

  // Fortune
  getFortune: (score: number) => {
    const { createFortuneResult } = require('./fortune');
    return createFortuneResult(score);
  },
} as const;
