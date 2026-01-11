// Re-export all supabase utilities
export { createClient } from './client';
export { createClient as createServerClient, createAdminClient } from './server';
export type {
  Database,
  DreamReading,
  DreamReadingInsert,
  DreamSymbolJson,
  InterpretationJson,
  UserProfile,
  UsageLog,
  CreditsState,
  DeductCreditResult,
  GetCreditsResult,
} from './types';
