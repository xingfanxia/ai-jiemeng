-- Add TOS consent tracking to user_profiles
-- This tracks when users accepted the Terms of Service and Privacy Policy

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS tos_accepted_at TIMESTAMPTZ;

-- Add comment for documentation
COMMENT ON COLUMN user_profiles.tos_accepted_at IS 'Timestamp when user accepted Terms of Service and Privacy Policy';
