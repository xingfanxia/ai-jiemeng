-- ================================================
-- Row Level Security (RLS) Policies Migration
-- AI周公解梦 (Dream Interpretation App)
--
-- This migration ensures comprehensive RLS policies for:
-- - user_profiles: User can only access own profile
-- - usage_log: User can view own logs, insert new ones
-- - llm_costs: User can view own cost records
-- - referrals: User can view referrals where they are referrer or referred
--
-- Note: dream_readings and dream_symbols RLS policies were created in 001_dream_tables.sql
-- ================================================

-- ================================================
-- user_profiles Table Policies
-- ================================================

-- Enable RLS on user_profiles
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any (idempotent)
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;

-- Users can only view their own profile
CREATE POLICY "Users can view own profile"
  ON public.user_profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile"
  ON public.user_profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can create their own profile (triggered on first sign-in)
CREATE POLICY "Users can insert own profile"
  ON public.user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Grant necessary permissions
GRANT SELECT, UPDATE ON public.user_profiles TO authenticated;
GRANT INSERT ON public.user_profiles TO authenticated;

-- ================================================
-- usage_log Table Policies
-- ================================================

-- Enable RLS on usage_log
ALTER TABLE public.usage_log ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any (idempotent)
DROP POLICY IF EXISTS "Users can view own usage logs" ON public.usage_log;
DROP POLICY IF EXISTS "Users can insert own usage logs" ON public.usage_log;

-- Users can only view their own usage logs
CREATE POLICY "Users can view own usage logs"
  ON public.usage_log
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own usage logs
CREATE POLICY "Users can insert own usage logs"
  ON public.usage_log
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Grant necessary permissions
GRANT SELECT, INSERT ON public.usage_log TO authenticated;

-- ================================================
-- llm_costs Table Policies
-- ================================================

-- Enable RLS on llm_costs
ALTER TABLE public.llm_costs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any (idempotent)
DROP POLICY IF EXISTS "Users can view own llm costs" ON public.llm_costs;
DROP POLICY IF EXISTS "Users can insert own llm costs" ON public.llm_costs;
DROP POLICY IF EXISTS "Service role can insert llm costs" ON public.llm_costs;

-- Users can only view their own LLM cost records
CREATE POLICY "Users can view own llm costs"
  ON public.llm_costs
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own LLM cost records
CREATE POLICY "Users can insert own llm costs"
  ON public.llm_costs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Grant necessary permissions
GRANT SELECT, INSERT ON public.llm_costs TO authenticated;
GRANT ALL ON public.llm_costs TO service_role;

-- ================================================
-- referrals Table Policies (if exists)
-- ================================================

-- Enable RLS on referrals (will fail silently if table doesn't exist)
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'referrals') THEN
    ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

    -- Drop existing policies if any
    DROP POLICY IF EXISTS "Users can view own referrals as referrer" ON public.referrals;
    DROP POLICY IF EXISTS "Users can view own referrals as referred" ON public.referrals;
    DROP POLICY IF EXISTS "Users can insert referrals where they are referred" ON public.referrals;

    -- Users can view referrals where they are the referrer
    CREATE POLICY "Users can view own referrals as referrer"
      ON public.referrals
      FOR SELECT
      USING (auth.uid() = referrer_id);

    -- Users can view referrals where they are the referred user
    CREATE POLICY "Users can view own referrals as referred"
      ON public.referrals
      FOR SELECT
      USING (auth.uid() = referred_id);

    -- Users can create referral records (when they sign up with referral code)
    CREATE POLICY "Users can insert referrals where they are referred"
      ON public.referrals
      FOR INSERT
      WITH CHECK (auth.uid() = referred_id);

    -- Grant necessary permissions
    GRANT SELECT, INSERT ON public.referrals TO authenticated;
    GRANT ALL ON public.referrals TO service_role;

    RAISE NOTICE 'RLS policies created for referrals table';
  ELSE
    RAISE NOTICE 'referrals table does not exist, skipping';
  END IF;
END $$;

-- ================================================
-- Verification Comments
-- ================================================

-- Verify RLS is enabled on all tables (run manually to check):
-- SELECT schemaname, tablename, rowsecurity
-- FROM pg_tables
-- WHERE schemaname = 'public'
-- AND tablename IN ('dream_readings', 'dream_symbols', 'user_profiles', 'usage_log', 'llm_costs', 'referrals');

-- Verify policies exist (run manually to check):
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
-- FROM pg_policies
-- WHERE schemaname = 'public';

COMMENT ON SCHEMA public IS 'RLS policies updated: All user data tables have row-level security enabled. Users can only access their own data.';
