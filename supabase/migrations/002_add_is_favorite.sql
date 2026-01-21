-- ================================================
-- Add is_favorite column to dream_readings table
-- Run: Apply to Supabase
-- ================================================

-- Add is_favorite boolean column with default false
ALTER TABLE public.dream_readings
ADD COLUMN IF NOT EXISTS is_favorite BOOLEAN DEFAULT false NOT NULL;

-- Create index for faster filtering by favorite
CREATE INDEX IF NOT EXISTS idx_dream_readings_is_favorite ON public.dream_readings(is_favorite) WHERE is_favorite = true;

-- Comment for documentation
COMMENT ON COLUMN public.dream_readings.is_favorite IS 'User can mark dreams as favorites for quick access';
