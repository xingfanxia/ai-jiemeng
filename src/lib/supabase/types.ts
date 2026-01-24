export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// Dream-specific types
export type DreamType = 'normal' | 'nightmare' | 'lucid' | 'recurring' | 'prenatal';
export type FortuneType = '大吉' | '吉' | '中平' | '凶' | '大凶';
export type DreamSource = 'manual' | 'voice' | 'credit_unlock';

export interface MoodData {
  emotion: string;
  intensity: number;
}

export interface Database {
  public: {
    Tables: {
      dream_readings: {
        Row: {
          id: string;
          user_id: string;
          title: string | null;
          content: string;
          dream_date: string;
          recorded_at: string;
          mood_before: MoodData | null;
          mood_after: MoodData | null;
          clarity: number | null;
          vividness: number | null;
          dream_type: DreamType;
          extracted_symbols: string[];
          interpretations: Json | null;
          fortune_score: number | null;
          fortune_type: FortuneType | null;
          chat_messages: Json[];
          source: DreamSource;
          is_favorite: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string | null;
          content: string;
          dream_date?: string;
          recorded_at?: string;
          mood_before?: MoodData | null;
          mood_after?: MoodData | null;
          clarity?: number | null;
          vividness?: number | null;
          dream_type?: DreamType;
          extracted_symbols?: string[];
          interpretations?: Json | null;
          fortune_score?: number | null;
          fortune_type?: FortuneType | null;
          chat_messages?: Json[];
          source?: DreamSource;
          is_favorite?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string | null;
          content?: string;
          dream_date?: string;
          recorded_at?: string;
          mood_before?: MoodData | null;
          mood_after?: MoodData | null;
          clarity?: number | null;
          vividness?: number | null;
          dream_type?: DreamType;
          extracted_symbols?: string[];
          interpretations?: Json | null;
          fortune_score?: number | null;
          fortune_type?: FortuneType | null;
          chat_messages?: Json[];
          source?: DreamSource;
          is_favorite?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_profiles: {
        Row: {
          id: string;
          total_credits: number;
          last_checkin_date: string | null;
          tier: 'free' | 'paid';
          max_saved_readings: number;
          total_unlocks: number;
          tos_accepted_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          total_credits?: number;
          last_checkin_date?: string | null;
          tier?: 'free' | 'paid';
          max_saved_readings?: number;
          total_unlocks?: number;
          tos_accepted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          total_credits?: number;
          last_checkin_date?: string | null;
          tier?: 'free' | 'paid';
          max_saved_readings?: number;
          total_unlocks?: number;
          tos_accepted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      usage_log: {
        Row: {
          id: string;
          user_id: string;
          action: string;
          app: string;
          credits_before: number | null;
          credits_after: number | null;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          action: string;
          app?: string;
          credits_before?: number | null;
          credits_after?: number | null;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          action?: string;
          app?: string;
          credits_before?: number | null;
          credits_after?: number | null;
          metadata?: Json | null;
          created_at?: string;
        };
      };
      llm_costs: {
        Row: {
          id: string;
          created_at: string;
          provider: 'claude' | 'gemini' | 'openai';
          model: string;
          input_tokens: number;
          output_tokens: number;
          estimated_cost: number;
          latency_ms: number;
          app: 'dream' | 'bazi' | 'liuren';
          endpoint: string;
          success: boolean;
          error_type: string | null;
          user_id: string | null;
          metadata: Json | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          provider: 'claude' | 'gemini' | 'openai';
          model: string;
          input_tokens: number;
          output_tokens: number;
          estimated_cost: number;
          latency_ms: number;
          app: 'dream' | 'bazi' | 'liuren';
          endpoint: string;
          success?: boolean;
          error_type?: string | null;
          user_id?: string | null;
          metadata?: Json | null;
        };
        Update: Partial<Database['public']['Tables']['llm_costs']['Insert']>;
      };
    };
    Views: Record<string, never>;
    Functions: {
      deduct_credit: {
        Args: { p_user_id: string; p_cost?: number };
        Returns: DeductCreditResult[];
      };
      get_credits: {
        Args: { p_user_id: string };
        Returns: GetCreditsResult[];
      };
    };
    Enums: Record<string, never>;
  };
}

// Function return types
export interface DeductCreditResult {
  success: boolean;
  remaining_credits: number;
  remaining_total?: number;
  remaining_daily?: number;
  error_message: string | null;
  referral_bonus_claimed?: boolean;
  referral_bonus_amount?: number;
}

export interface GetCreditsResult {
  credits: number;
  checked_in_today: boolean;
  bonus_awarded: boolean;
}

// Credits state for UI
export interface CreditsState {
  credits: number;
  checkedInToday: boolean;
}

// Dream symbol stored in JSONB
export interface DreamSymbolJson {
  name: string;
  meaning: string;
  category: string;
  significance: 'high' | 'medium' | 'low';
}

// Dream interpretation stored in JSONB
export interface InterpretationJson {
  summary: string;
  detailed: string;
  advice: string;
  themes: string[];
  emotionalAnalysis: string;
  futureGuidance?: string;
}

// Type helpers
export type DreamReading = Database['public']['Tables']['dream_readings']['Row'];
export type DreamReadingInsert = Database['public']['Tables']['dream_readings']['Insert'];
export type DreamReadingUpdate = Database['public']['Tables']['dream_readings']['Update'];
export type UserProfile = Database['public']['Tables']['user_profiles']['Row'];
export type UsageLog = Database['public']['Tables']['usage_log']['Row'];
export type LlmCost = Database['public']['Tables']['llm_costs']['Row'];
export type LlmCostInsert = Database['public']['Tables']['llm_costs']['Insert'];
