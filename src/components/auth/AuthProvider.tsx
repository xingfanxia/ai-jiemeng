'use client';

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import posthog from 'posthog-js';
import type { User, Session } from '@supabase/supabase-js';
import type { CreditsState } from '@/lib/supabase/types';

// LocalStorage key for preserving dream state across OAuth redirect
const DREAM_STATE_KEY = 'jiemeng_pending_dream';

export interface PendingDreamState {
  dreamContent: string;
  moods?: string[];
  context?: {
    gender?: 'male' | 'female' | 'other';
    isPregnant?: boolean;
    dreamTime?: string;
  };
  showResult?: boolean;
  timestamp: number;
}

// Save dream state before OAuth redirect
export function savePendingDreamState(state: Omit<PendingDreamState, 'timestamp'>) {
  if (typeof window === 'undefined') return;
  try {
    const stateWithTimestamp: PendingDreamState = {
      ...state,
      timestamp: Date.now(),
    };
    localStorage.setItem(DREAM_STATE_KEY, JSON.stringify(stateWithTimestamp));
  } catch (e) {
    console.error('Failed to save pending dream state:', e);
  }
}

// Get pending dream state (returns null if expired or not found)
export function getPendingDreamState(): PendingDreamState | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(DREAM_STATE_KEY);
    if (!stored) return null;
    
    const state = JSON.parse(stored) as PendingDreamState;
    // Expire after 10 minutes to prevent stale state
    const TEN_MINUTES = 10 * 60 * 1000;
    if (Date.now() - state.timestamp > TEN_MINUTES) {
      clearPendingDreamState();
      return null;
    }
    return state;
  } catch (e) {
    console.error('Failed to get pending dream state:', e);
    return null;
  }
}

// Clear pending dream state
export function clearPendingDreamState() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(DREAM_STATE_KEY);
  } catch (e) {
    console.error('Failed to clear pending dream state:', e);
  }
}

export interface SaveLimitState {
  used: number;
  max: number;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  credits: CreditsState;
  isCreditsLoading: boolean;
  saveLimit: SaveLimitState;
  isSaveLimitLoading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUpWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signInWithTwitter: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshCredits: () => Promise<void>;
  refreshSaveLimit: () => Promise<void>;
}

const defaultCredits: CreditsState = { credits: 0, checkedInToday: false };
const defaultSaveLimit: SaveLimitState = { used: 0, max: 5 };

// Check-in bonus event for toast notifications
type CheckInCallback = (credits: number) => void;
let checkInCallbacks: CheckInCallback[] = [];

export function onCheckInBonus(callback: CheckInCallback) {
  checkInCallbacks.push(callback);
  return () => {
    checkInCallbacks = checkInCallbacks.filter(cb => cb !== callback);
  };
}

function notifyCheckInBonus(credits: number) {
  checkInCallbacks.forEach(cb => cb(credits));
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [credits, setCredits] = useState<CreditsState>(defaultCredits);
  const [isCreditsLoading, setIsCreditsLoading] = useState(false);
  const [saveLimit, setSaveLimit] = useState<SaveLimitState>(defaultSaveLimit);
  const [isSaveLimitLoading, setIsSaveLimitLoading] = useState(false);

  const supabase = createClient();

  // Fetch credits from API
  const refreshCredits = useCallback(async () => {
    if (!user) {
      setCredits(defaultCredits);
      return;
    }

    setIsCreditsLoading(true);
    try {
      const response = await fetch('/api/credits');
      if (response.ok) {
        const data = await response.json();
        setCredits({
          credits: data.credits,
          checkedInToday: data.checkedInToday,
        });
        // Trigger toast if bonus was just awarded
        if (data.bonusAwarded) {
          notifyCheckInBonus(data.credits);
        }
      } else {
        // User might be new, use defaults
        setCredits({ credits: 10, checkedInToday: false });
      }
    } catch (error) {
      console.error('Failed to fetch credits:', error);
      setCredits(defaultCredits);
    } finally {
      setIsCreditsLoading(false);
    }
  }, [user]);

  // Fetch save limit from API
  const refreshSaveLimit = useCallback(async () => {
    if (!user) {
      setSaveLimit(defaultSaveLimit);
      return;
    }

    setIsSaveLimitLoading(true);
    try {
      const response = await fetch('/api/dreams?limit=1');
      if (response.ok) {
        const data = await response.json();
        if (data.saveLimit) {
          setSaveLimit({
            used: data.saveLimit.used,
            max: data.saveLimit.max,
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch save limit:', error);
    } finally {
      setIsSaveLimitLoading(false);
    }
  }, [user]);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      // Identify user in PostHog if logged in
      if (session?.user?.email) {
        posthog.identify(session.user.id, {
          email: session.user.email,
        });
      }
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
        
        // Identify user in PostHog on login
        if (event === 'SIGNED_IN' && session?.user?.email) {
          posthog.identify(session.user.id, {
            email: session.user.email,
          });
        }
        // Reset PostHog on logout
        if (event === 'SIGNED_OUT') {
          posthog.reset();
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  // Fetch credits and save limit when user changes
  useEffect(() => {
    if (user) {
      refreshCredits();
      refreshSaveLimit();
    } else {
      setCredits(defaultCredits);
      setSaveLimit(defaultSaveLimit);
    }
  }, [user, refreshCredits, refreshSaveLimit]);

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error as Error | null };
  };

  const signUpWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Redirect to homepage after email confirmation (no callback needed)
        emailRedirectTo: `${window.location.origin}/`,
      },
    });
    return { error: error as Error | null };
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { error: error as Error | null };
  };

  const signInWithTwitter = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'x',  // OAuth 2.0 uses 'x', not 'twitter'
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setCredits(defaultCredits);
    setSaveLimit(defaultSaveLimit);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        credits,
        isCreditsLoading,
        saveLimit,
        isSaveLimitLoading,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signInWithTwitter,
        signOut,
        refreshCredits,
        refreshSaveLimit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
