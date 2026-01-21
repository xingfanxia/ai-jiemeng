/**
 * Dream Interpretation Types
 */

import type { FortuneType } from '@/lib/knowledge/fortune';

/**
 * A single dream symbol extracted from the dream
 */
export interface DreamSymbol {
  /** The name of the symbol (e.g., "water", "flying", "snake") */
  name: string;
  /** The interpreted meaning of this symbol in the dream context */
  meaning: string;
  /** Category of the symbol for grouping */
  category: DreamSymbolCategory;
  /** How significant this symbol is to the overall interpretation */
  significance: 'high' | 'medium' | 'low';
  /** Optional cultural/traditional meaning */
  traditionalMeaning?: string;
}

/**
 * Categories for dream symbols
 */
export type DreamSymbolCategory =
  | 'nature'      // Water, fire, mountains, forests
  | 'animals'     // Any animals in dreams
  | 'people'      // Known or unknown people
  | 'objects'     // Physical objects
  | 'places'      // Locations, buildings
  | 'actions'     // Flying, falling, running
  | 'emotions'    // Feelings experienced
  | 'abstract'    // Abstract concepts
  | 'body'        // Body parts, physical sensations
  | 'colors'      // Significant colors
  | 'numbers';    // Numbers or quantities

/**
 * The full interpretation of a dream
 */
export interface DreamInterpretation {
  /** Brief one-paragraph summary */
  summary: string;
  /** Detailed multi-paragraph interpretation */
  detailed: string;
  /** Practical advice or guidance based on the dream */
  advice: string;
  /** Main themes identified in the dream */
  themes: string[];
  /** Analysis of the emotional content */
  emotionalAnalysis: string;
  /** Guidance for the future based on the dream */
  futureGuidance?: string;
}

/**
 * A complete dream reading with interpretation and symbols
 */
export interface DreamReading {
  /** Unique identifier */
  id: string;
  /** User ID (if logged in) */
  userId?: string;
  /** Optional title for the dream */
  title?: string;
  /** The original dream content provided by user */
  dreamContent: string;
  /** The AI-generated interpretation */
  interpretation: DreamInterpretation;
  /** Symbols extracted from the dream */
  symbols: DreamSymbol[];
  /** Overall mood of the dream */
  mood?: DreamMood;
  /** Tags for categorization */
  tags?: string[];
  /** When the dream was recorded/interpreted */
  createdAt: Date;
  /** Last update time */
  updatedAt: Date;
}

/**
 * Mood classification for dreams
 */
export type DreamMood =
  | 'peaceful'
  | 'anxious'
  | 'joyful'
  | 'fearful'
  | 'confused'
  | 'adventurous'
  | 'nostalgic'
  | 'romantic'
  | 'mysterious'
  | 'neutral';

/**
 * Request payload for dream interpretation
 */
export interface InterpretDreamRequest {
  /** The dream content to interpret */
  dreamContent: string;
  /** Optional mood hint from user */
  mood?: DreamMood;
  /** Optional context about the dreamer's current life situation */
  context?: string;
  /** Whether to include traditional/cultural interpretations */
  includeTraditional?: boolean;
}

/**
 * Response from dream interpretation
 */
export interface InterpretDreamResponse {
  /** The full interpretation */
  interpretation: DreamInterpretation;
  /** Extracted symbols */
  symbols: DreamSymbol[];
  /** Detected mood */
  detectedMood: DreamMood;
  /** Processing metadata */
  metadata?: {
    provider: string;
    model: string;
    latencyMs: number;
    tokensUsed: number;
  };
}

/**
 * Dream journal entry for history tracking
 */
export interface DreamJournalEntry {
  id: string;
  title: string;
  dreamContent: string;
  interpretationSummary: string;
  symbols: string[];
  mood: DreamMood;
  tags: string[];
  createdAt: Date;
  isFavorite: boolean;
  /** Full interpretation text (for loading saved dreams) */
  fullInterpretation?: string | null;
  /** Guidance text (for loading saved dreams) */
  guidance?: string | null;
  /** Fortune type */
  fortuneType?: FortuneType | null;
  /** Fortune score */
  fortuneScore?: number | null;
  /** Dream type */
  dreamType?: string | null;
  /** Dream date */
  dreamDate?: string | null;
}
