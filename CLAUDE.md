# AI周公解梦 - Project Instructions

## Overview

AI-powered Chinese dream interpretation app (周公解梦). Users input their dreams and receive traditional Chinese-style interpretations with multi-perspective analysis (Zhou Gong, psychological, symbolic).

**Live**: https://jiemeng.ax0x.ai
**GitHub**: https://github.com/xingfanxia/ai-jiemeng

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, React, Tailwind CSS, shadcn/ui |
| Backend | Next.js API Routes (serverless) |
| Database | Supabase (shared with bazi-app) |
| Auth | Supabase OAuth (Google) |
| AI | Google Gemini 3 / Anthropic Claude (configurable via feature flags) |
| Analytics | PostHog (events, feature flags, LLM analytics) |
| Deployment | Vercel |

## Key Directories

```
src/
├── app/
│   ├── api/
│   │   ├── interpret/     # FREE dream interpretation (streaming)
│   │   ├── guidance/      # Paid guidance (1 credit)
│   │   ├── dreams/        # Dream CRUD
│   │   ├── symbols/       # Symbol dictionary search
│   │   └── credits/       # User credits + check-in
│   └── page.tsx           # Main dream form UI
├── components/
│   ├── auth/              # AuthModal, UserMenu, CreditsBadge
│   └── dream/             # DreamForm, AIInterpretation, DreamJournal
├── lib/
│   ├── ai/                # AI providers and interpretation logic
│   │   ├── config.ts      # Model config, feature flag integration
│   │   ├── interpret.ts   # Dream interpretation streaming
│   │   ├── providers/     # Claude + Gemini implementations
│   │   └── types.ts       # AIModelId, AIProviderType
│   ├── knowledge/         # Dream symbol dictionary (70+ symbols)
│   ├── supabase/          # Client, server, middleware
│   └── posthog.ts         # Server-side PostHog client
```

## AI Model Configuration

Models are controlled via PostHog feature flag: `jiemeng-ai-model-experiment`

| Model ID | Provider | Actual Model | Input $/1M | Output $/1M |
|----------|----------|--------------|------------|-------------|
| `gemini-3-flash` | Google | gemini-3-flash-preview | $0.50 | $3.00 |
| `gemini-3-pro` | Google | gemini-3-pro-preview | $2.00 | $12.00 |
| `claude-sonnet-4-5` | Anthropic | claude-sonnet-4-5 | $3.00 | $15.00 |
| `claude-opus-4-5` | Anthropic | claude-opus-4-5 | $5.00 | $25.00 |

**Current**: gemini-3-pro at 100%

To change model distribution:
1. Go to PostHog Dashboard > Feature Flags
2. Find `jiemeng-ai-model-experiment`
3. Adjust variant percentages

## Important Patterns

### OAuth State Preservation
Dream input is preserved across Google OAuth redirects:
- `DreamForm` saves input to sessionStorage before login redirect
- After OAuth callback, form restores from sessionStorage
- Key: `jiemeng_pending_dream`

### Export with Lucide Icons
Safari/WeChat canvas export fails with emojis. All mood icons use Lucide React icons instead:
- CloudSun, Smile, AlertTriangle, Ghost, HelpCircle, Compass, etc.
- Export uses `modern-screenshot` (domToPng)

### Credits System
Shared with bazi-app via Supabase RPC functions:
- Read credits: `get_credits(user_id)` RPC
- Deduct credits: `deduct_credit(user_id, amount)` RPC
- Daily check-in: Handled in `/api/credits`

### PostHog Integration
- **Client**: `posthog-js` via `PostHogProvider` in layout
- **Server**: `posthog-node` in `lib/posthog.ts`
- **CRITICAL**: Call `flushPostHog()` at end of serverless functions
- LLM analytics tracked via `$ai_generation` event

## Environment Variables

```env
# Supabase (via Vercel integration)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI Providers
GOOGLE_AI_API_KEY=
ANTHROPIC_API_KEY=

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# Legacy (optional, feature flag takes precedence)
GEMINI_MODEL=gemini-3-pro-preview
AI_DEFAULT_PROVIDER=gemini
```

## Database Tables

Uses shared Supabase project with bazi-app:
- `dream_readings` - User dream entries
- `user_credits` - Credits balance (shared with bazi-app)
- `llm_costs` - LLM usage logging (shared, app='dream')

## Quick Commands

```bash
# Development
npm run dev

# Build
npm run build

# Check for errors
npm run lint
```

## Recent Changes

### Session 58: Unified Credit Pool (2026-01-28)
- Adopted unified credit pool pattern: `daily_credits` merged into `total_credits`
- Removed dual-pool calculation (`remaining_total + remaining_daily`) in guidance API
- Now uses single `remaining_total` value
- Added `@deprecated` JSDoc to `remaining_daily` in DeductCreditResult type

## Related Projects

- **bazi-app**: Shares auth, credits, and cost logging infrastructure
