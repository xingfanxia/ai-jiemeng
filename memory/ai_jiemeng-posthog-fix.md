# PostHog Integration Fixes - ai_jiemeng

## Changes Made

### 1. User Identification with Email
- **File**: `src/components/auth/AuthProvider.tsx`
- Added `posthog.identify()` call when user logs in (both initial session and auth state change)
- Added `posthog.reset()` on sign out

### 2. LLM Analytics with @posthog/ai Wrapping
- **File**: `src/lib/ai/providers/gemini-provider.ts`
- Replaced `GoogleGenAI` with `PostHogGoogleGenAI` from `@posthog/ai`
- **File**: `src/lib/ai/providers/claude-provider.ts`
- Replaced `Anthropic` with `PostHogAnthropic` from `@posthog/ai`

### 3. Exception Capture
- **File**: `src/app/posthog-provider.tsx` - Added `capture_exceptions: true`
- **File**: `src/lib/posthog.ts` - Added `captureException()` helper for server-side

### 4. OpenTelemetry Logging
- **File**: `src/lib/otel-logger.ts` (new) - Full OTel logger setup for PostHog
- **Dependencies**: Added `@opentelemetry/sdk-node`, `@opentelemetry/exporter-logs-otlp-http`, etc.
