# OAuth Redirect State Preservation Fix

## Problem
When users enter dream content without logging in and try to unlock the guidance feature, they are prompted to login. When they click Google OAuth login, the page redirects and all their dream input is lost after returning.

## Solution
Implemented localStorage-based state preservation before OAuth redirect, similar to patterns used in other apps.

## Files Modified

### 1. `/src/components/auth/AuthProvider.tsx`
- Added `PendingDreamState` interface to define the shape of saved dream state
- Added `DREAM_STATE_KEY` constant for localStorage key (`'jiemeng_pending_dream'`)
- Added three utility functions:
  - `savePendingDreamState()` - Saves dream content, moods, context, and showResult flag to localStorage with timestamp
  - `getPendingDreamState()` - Retrieves saved state (returns null if expired after 10 minutes)
  - `clearPendingDreamState()` - Clears the saved state from localStorage

### 2. `/src/components/auth/AuthModal.tsx`
- Added `onBeforeOAuthRedirect` optional callback prop
- Called this callback before `signInWithGoogle()` and `signInWithTwitter()` to save state before redirect

### 3. `/src/components/dream/AIInterpretation.tsx`
- Added `showAuthModal` state to control login modal visibility
- When guidance API returns `UNAUTHORIZED`, now shows AuthModal instead of just error text
- Added `AuthModal` component to both render paths (with and without container)
- Pass `onBeforeOAuthRedirect` callback that saves current dream state to localStorage

### 4. `/src/app/page.tsx`
- Added `useEffect` that runs after auth loading completes
- When user is logged in, checks for pending dream state in localStorage
- Restores dream content, moods, context, and showResult if found
- Clears pending state after successful restoration
- Added `restoredFromPending` state flag (for potential future use)

### 5. `/src/components/auth/index.ts`
- Exported new functions: `savePendingDreamState`, `getPendingDreamState`, `clearPendingDreamState`
- Exported `PendingDreamState` type

## Flow After Fix
1. User enters dream content without logging in
2. User submits dream, sees interpretation
3. User clicks "Unlock Guidance" (requires login)
4. API returns UNAUTHORIZED, AuthModal opens
5. User clicks Google OAuth login
6. **Before redirect**: `savePendingDreamState()` saves dream content to localStorage
7. OAuth redirect to Google, then back to `/auth/callback`, then to homepage
8. Page loads, `useEffect` in page.tsx checks for pending state
9. User is now logged in, pending state exists
10. State is restored: dreamContent, moods, context, showResult=true
11. localStorage is cleared
12. User sees their dream interpretation restored, can now unlock guidance

## State Shape
```typescript
interface PendingDreamState {
  dreamContent: string;
  moods?: string[];
  context?: {
    gender?: 'male' | 'female' | 'other';
    isPregnant?: boolean;
    dreamTime?: string;
  };
  showResult?: boolean;
  timestamp: number;  // For 10-minute expiration
}
```

## Build Status
Build completed successfully with no type errors.
