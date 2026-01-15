# Architecture Overview

AI周公解梦 - Chinese Dream Interpretation App

## Directory Structure

```
ai_jiemeng/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API Routes (serverless)
│   │   │   ├── interpret/      # Dream interpretation (streaming, FREE)
│   │   │   ├── guidance/       # Guidance generation (1 credit)
│   │   │   ├── dreams/         # Dream CRUD operations
│   │   │   ├── symbols/        # Symbol dictionary search
│   │   │   └── credits/        # User credits + daily check-in
│   │   ├── auth/callback/      # OAuth callback handler
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Main dream form page
│   │   └── posthog-provider.tsx# Client-side PostHog setup
│   │
│   ├── components/
│   │   ├── auth/               # Authentication components
│   │   │   ├── AuthModal.tsx   # Login/signup modal (Chinese)
│   │   │   ├── AuthProvider.tsx# Auth context provider
│   │   │   ├── CreditsBadge.tsx# Credit display in header
│   │   │   └── UserMenu.tsx    # User dropdown menu
│   │   ├── dream/              # Dream-related components
│   │   │   ├── DreamForm.tsx   # Main input form with options
│   │   │   ├── AIInterpretation.tsx # 2-tab result display
│   │   │   ├── DreamJournal.tsx# Saved dreams list
│   │   │   ├── FortuneIndicator.tsx # 吉凶 badge
│   │   │   └── SymbolCard.tsx  # Symbol detail display
│   │   └── ui/                 # shadcn/ui components
│   │
│   ├── hooks/
│   │   └── useTypewriter.ts    # Typing animation effect
│   │
│   └── lib/
│       ├── ai/                 # AI provider abstraction
│       │   ├── config.ts       # Model config + feature flags
│       │   ├── index.ts        # Cost calculation exports
│       │   ├── interpret.ts    # Interpretation logic
│       │   ├── providers/      # Provider implementations
│       │   │   ├── claude.ts   # Anthropic Claude
│       │   │   ├── gemini.ts   # Google Gemini
│       │   │   └── index.ts    # Provider factory
│       │   └── types.ts        # TypeScript types
│       ├── knowledge/          # Dream interpretation knowledge
│       │   ├── symbols.ts      # 70+ dream symbols
│       │   ├── conditions.ts   # 时辰, 五行 conditions
│       │   ├── prompts.ts      # AI system prompts
│       │   └── categories.ts   # Symbol categorization
│       ├── supabase/           # Database client
│       │   ├── client.ts       # Browser client
│       │   ├── server.ts       # Server client
│       │   └── middleware.ts   # Auth middleware
│       ├── posthog.ts          # Server-side PostHog
│       ├── types/              # Shared TypeScript types
│       └── utils.ts            # Utility functions
│
├── docs/                       # Documentation
├── handoffs/                   # Session handoff docs
├── memory/                     # RPI workflow artifacts
└── public/                     # Static assets
```

## Key Files

| File | Purpose | Key Exports |
|------|---------|-------------|
| `src/lib/ai/config.ts` | AI model configuration | `MODEL_CONFIG`, `getAIModelFromFlag()`, `AI_MODEL_EXPERIMENT_FLAG` |
| `src/lib/ai/interpret.ts` | Dream interpretation logic | `streamDreamInterpretation()`, `streamGuidance()` |
| `src/lib/ai/providers/` | AI provider implementations | `ClaudeProvider`, `GeminiProvider` |
| `src/lib/posthog.ts` | Server PostHog client | `captureServerEvent()`, `getFeatureFlag()`, `flushPostHog()` |
| `src/lib/knowledge/symbols.ts` | Dream symbol dictionary | `searchSymbols()`, `getSymbolByName()` |
| `src/lib/knowledge/prompts.ts` | AI system prompts | `MULTI_PERSPECTIVE_SYSTEM_PROMPT`, `GUIDANCE_SYSTEM_PROMPT` |
| `src/components/dream/DreamForm.tsx` | Main input form | Dream input with 时辰, mood, context options |
| `src/components/dream/AIInterpretation.tsx` | Result display | 2-tab UI (解梦 + 指引) with streaming |

## Data Flow

### Dream Interpretation Flow

```
┌─────────────────┐
│   DreamForm     │ User enters dream description
└────────┬────────┘
         │ POST /api/interpret
         ▼
┌─────────────────┐
│ interpret/route │ Validates input, builds context
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ interpret.ts    │ selectInterpretationModel()
│                 │   └── getAIModelFromFlag() ─── PostHog Feature Flag
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ AI Provider     │ Claude or Gemini (streaming)
│ (gemini.ts or   │
│  claude.ts)     │
└────────┬────────┘
         │ SSE stream
         ▼
┌─────────────────┐
│AIInterpretation │ Displays streaming response
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ PostHog +       │ Logs usage, cost, latency
│ Supabase        │ $ai_generation event + llm_costs table
└─────────────────┘
```

### Auth Flow with State Preservation

```
┌─────────────────┐
│   DreamForm     │ User has pending dream input
└────────┬────────┘
         │ Clicks "解梦" (interpret)
         ▼
┌─────────────────┐
│ Needs login?    │────── No ──────► /api/interpret
└────────┬────────┘
         │ Yes
         ▼
┌─────────────────┐
│ sessionStorage  │ Saves dream to 'jiemeng_pending_dream'
│ save state      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Google OAuth    │ Supabase redirects to Google
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ /auth/callback  │ Handles OAuth callback
└────────┬────────┘
         │ Redirect to /
         ▼
┌─────────────────┐
│   DreamForm     │ Restores from sessionStorage
│   (onMount)     │ Auto-submits interpretation
└─────────────────┘
```

## PostHog Integration

### Event Tracking

| Event | When | Key Properties |
|-------|------|----------------|
| `$ai_generation` | After AI response | `$ai_model`, `$ai_latency`, `llm_cost`, `endpoint` |
| `$pageview` | Page load | Auto-captured |
| `$exception` | On errors | `$exception_message`, `$exception_stack_trace_raw` |

### Feature Flags

| Flag | Type | Purpose |
|------|------|---------|
| `jiemeng-ai-model-experiment` | Multivariate | A/B test AI models |

Variants: `gemini-3-flash`, `gemini-3-pro`, `claude-sonnet-4-5`, `claude-opus-4-5`

### Server-Side Usage

```typescript
import { getFeatureFlag, captureServerEvent, flushPostHog } from '@/lib/posthog';

// Get feature flag
const model = await getFeatureFlag('jiemeng-ai-model-experiment', userId);

// Track event
captureServerEvent(userId, '$ai_generation', { ... });

// CRITICAL: Flush before serverless function ends
await flushPostHog();
```

## Database Schema

### dream_readings

```sql
CREATE TABLE dream_readings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  content TEXT NOT NULL,
  interpretation TEXT,
  guidance TEXT,
  fortune_level TEXT, -- 大吉/吉/中平/凶/大凶
  dream_date DATE,
  dream_time TEXT,    -- 子时, 丑时, etc.
  moods TEXT[],
  context JSONB,      -- { isPregnant, occupation, gender }
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Shared Tables (with bazi-app)

- `user_credits` - User credit balance
- `llm_costs` - LLM usage and cost logging

## External Dependencies

| Dependency | Purpose | Docs |
|------------|---------|------|
| `@google/generative-ai` | Gemini API | https://ai.google.dev/docs |
| `@anthropic-ai/sdk` | Claude API | https://docs.anthropic.com |
| `posthog-node` | Server analytics | https://posthog.com/docs/libraries/node |
| `@supabase/supabase-js` | Database + Auth | https://supabase.com/docs |
| `modern-screenshot` | Image export | https://github.com/nickydev/modern-screenshot |
| `lucide-react` | Icons | https://lucide.dev |

## Key Patterns

### Streaming SSE Response

```typescript
// In API route
const stream = new ReadableStream({
  async start(controller) {
    for await (const chunk of streamDreamInterpretation(request)) {
      const event = `data: ${JSON.stringify(chunk)}\n\n`;
      controller.enqueue(encoder.encode(event));
    }
    controller.close();
  },
});

return new Response(stream, {
  headers: { 'Content-Type': 'text/event-stream' }
});
```

### Feature Flag Model Selection

```typescript
// In interpret.ts
const modelId = await getAIModelFromFlag(userId, getFeatureFlag);
const config = MODEL_CONFIG[modelId]; // { provider, modelName }
const provider = getProvider(config.provider);
```

### Cost Logging

```typescript
logLlmCost({
  provider: 'gemini',
  model: 'gemini-3-pro-preview',
  inputTokens: 500,
  outputTokens: 1200,
  estimatedCost: 0.0154,
  latencyMs: 2300,
  endpoint: 'interpret',
  success: true,
});
```
