-- ================================================
-- Dream Tables Migration for AI周公解梦App
-- Run: Already applied to Supabase on 2026-01-11
-- ================================================

-- Dream Readings Table
CREATE TABLE IF NOT EXISTS public.dream_readings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

    -- Dream content
    title TEXT,
    content TEXT NOT NULL,

    -- Metadata
    dream_date DATE DEFAULT CURRENT_DATE,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

    -- Mood tracking
    mood_before JSONB,
    mood_after JSONB,

    -- Quality metrics
    clarity INTEGER CHECK (clarity >= 1 AND clarity <= 10),
    vividness INTEGER CHECK (vividness >= 1 AND vividness <= 10),

    -- Classification
    dream_type TEXT DEFAULT 'normal' CHECK (dream_type IN ('normal', 'nightmare', 'lucid', 'recurring', 'prenatal')),

    -- AI interpretation
    extracted_symbols JSONB DEFAULT '[]'::jsonb,
    interpretations JSONB,
    fortune_score INTEGER CHECK (fortune_score >= 0 AND fortune_score <= 100),
    fortune_type TEXT CHECK (fortune_type IN ('大吉', '吉', '中平', '凶', '大凶')),

    -- Chat
    chat_messages JSONB DEFAULT '[]'::jsonb,

    -- Tracking
    source TEXT DEFAULT 'manual' CHECK (source IN ('manual', 'voice', 'credit_unlock')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Dream Symbols Knowledge Base
CREATE TABLE IF NOT EXISTS public.dream_symbols (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

    name TEXT NOT NULL UNIQUE,
    pinyin TEXT,
    aliases TEXT[] DEFAULT '{}',

    category_primary TEXT NOT NULL,
    category_secondary TEXT,
    tags TEXT[] DEFAULT '{}',

    default_interpretation TEXT,
    default_fortune TEXT CHECK (default_fortune IN ('大吉', '吉', '中平', '凶', '大凶')),
    conditional_interpretations JSONB DEFAULT '[]'::jsonb,

    related_symbols TEXT[] DEFAULT '{}',
    psychological_meaning TEXT,
    lucky_numbers INTEGER[] DEFAULT '{}',

    primary_source TEXT,
    source_reliability DECIMAL(3,2) CHECK (source_reliability >= 0 AND source_reliability <= 1),

    search_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_dream_readings_user_id ON public.dream_readings(user_id);
CREATE INDEX IF NOT EXISTS idx_dream_readings_created_at ON public.dream_readings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_dream_readings_dream_date ON public.dream_readings(dream_date DESC);
CREATE INDEX IF NOT EXISTS idx_dream_symbols_name ON public.dream_symbols(name);
CREATE INDEX IF NOT EXISTS idx_dream_symbols_pinyin ON public.dream_symbols(pinyin);
CREATE INDEX IF NOT EXISTS idx_dream_symbols_category ON public.dream_symbols(category_primary);
CREATE INDEX IF NOT EXISTS idx_dream_symbols_aliases ON public.dream_symbols USING GIN(aliases);

-- RLS Policies
ALTER TABLE public.dream_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dream_symbols ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own dream readings" ON public.dream_readings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own dream readings" ON public.dream_readings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own dream readings" ON public.dream_readings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own dream readings" ON public.dream_readings FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view dream symbols" ON public.dream_symbols FOR SELECT USING (true);

-- Triggers
CREATE TRIGGER on_dream_readings_updated BEFORE UPDATE ON public.dream_readings FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER on_dream_symbols_updated BEFORE UPDATE ON public.dream_symbols FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Limit enforcement function
CREATE OR REPLACE FUNCTION check_dream_readings_limit()
RETURNS TRIGGER AS $$
DECLARE
    max_readings INTEGER;
    current_count INTEGER;
BEGIN
    SELECT COALESCE(max_saved_readings, 5) INTO max_readings FROM public.user_profiles WHERE id = NEW.user_id;
    IF max_readings IS NULL THEN max_readings := 5; END IF;
    SELECT COUNT(*) INTO current_count FROM public.dream_readings WHERE user_id = NEW.user_id;
    IF current_count >= max_readings THEN
        RAISE EXCEPTION 'Dream readings limit reached (% of %)', current_count, max_readings;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER enforce_dream_readings_limit BEFORE INSERT ON public.dream_readings FOR EACH ROW EXECUTE FUNCTION check_dream_readings_limit();

-- Grants
GRANT ALL ON public.dream_readings TO authenticated;
GRANT SELECT ON public.dream_symbols TO anon;
GRANT SELECT ON public.dream_symbols TO authenticated;
GRANT ALL ON public.dream_symbols TO service_role;
