# A/B Testing Infrastructure for AI Model Comparison

## Overview

Set up A/B testing infrastructure to compare cost, quality, and latency across 4 AI models in the jiemeng dream interpretation app.

## Models Configured

| Model ID | Provider | Actual Model Name | Input $/1M | Output $/1M |
|----------|----------|-------------------|------------|-------------|
| `gemini-3-flash` | Google | `gemini-3-flash-preview` | $0.50 | $3.00 |
| `gemini-3-pro` | Google | `gemini-3-pro-preview` | $2.00 | $12.00 |
| `claude-sonnet-4-5` | Anthropic | `claude-sonnet-4-5` | $3.00 | $15.00 |
| `claude-opus-4-5` | Anthropic | `claude-opus-4-5` | $5.00 | $25.00 |

## Files Modified

### 1. `/src/lib/ai/types.ts`
- Added `claude-sonnet-4-5` to `AIModelId` union type

### 2. `/src/lib/ai/config.ts`
- Updated `MODEL_CONFIG` with all 4 models
- Updated `COST_PER_MILLION_TOKENS` with pricing for all 4 models
- Updated `VALID_MODEL_IDS` array to include all 4 models
- Updated `getModelId()` function to recognize sonnet models

### 3. `/src/lib/ai/interpret.ts`
- Updated `MODEL_DISPLAY_NAMES` to include "Claude Sonnet 4.5"

### 4. `/src/app/api/interpret/route.ts`
- Added `llm_cost` field to PostHog event tracking

## PostHog Feature Flag Configuration

The feature flag `jiemeng-ai-model-experiment` needs to be configured in PostHog dashboard:

### Flag Setup

1. Go to PostHog Dashboard > Feature Flags
2. Find or create flag: `jiemeng-ai-model-experiment`
3. Set flag type: **Multivariate**
4. Configure variants:

| Variant Key | Rollout % | Description |
|-------------|-----------|-------------|
| `gemini-3-flash` | 25% | Cheapest, fastest |
| `gemini-3-pro` | 25% | Mid-tier quality |
| `claude-sonnet-4-5` | 25% | High quality, mid-price |
| `claude-opus-4-5` | 25% | Highest quality, highest cost |

### Recommended Distribution for Statistical Significance

For equal comparison, use 25% each. Alternatively, for cost optimization while gathering data:

| Phase | Distribution | Purpose |
|-------|--------------|---------|
| Initial (1-2 weeks) | 25% each | Equal comparison baseline |
| Cost-conscious | 40/30/20/10 (flash/pro/sonnet/opus) | Reduce cost while still comparing |
| Quality focus | 10/30/30/30 (flash/pro/sonnet/opus) | Focus on quality models |

## PostHog Analytics Tracked

Each `$ai_generation` event tracks:

| Property | Description |
|----------|-------------|
| `$ai_provider` | Provider type: `claude` or `gemini` |
| `$ai_model` | Full model name (e.g., `gemini-3-flash-preview`) |
| `$ai_input_tokens` | Input tokens used |
| `$ai_output_tokens` | Output tokens generated |
| `$ai_latency` | Total latency in ms |
| `llm_cost` | Estimated cost in USD |
| `endpoint` | `jiemeng/interpret` |
| `success` | Boolean success status |
| `streaming` | `true` (streaming enabled) |

## Viewing Results in PostHog

### 1. LLM Dashboard (if using @posthog/ai wrapper)
- Go to PostHog > LLM tab
- See automatic cost/latency tracking per model

### 2. Custom Insights

**Cost by Model:**
```
Event: $ai_generation
Breakdown: $ai_model
Aggregate: Sum of llm_cost
```

**Latency by Model:**
```
Event: $ai_generation
Breakdown: $ai_model
Aggregate: Average of $ai_latency
```

**Token Usage:**
```
Event: $ai_generation
Breakdown: $ai_model
Aggregate: Sum of $ai_input_tokens, Sum of $ai_output_tokens
```

### 3. Experiment Results

If using PostHog Experiments:
1. Go to PostHog > Experiments
2. Create experiment with `jiemeng-ai-model-experiment` flag
3. Set goal metric (e.g., conversion, retention)
4. View statistical significance

## Database Cost Logging

Costs are also logged to Supabase `llm_costs` table for additional analysis:

- `provider`: claude/gemini
- `model`: Full model name
- `input_tokens`, `output_tokens`
- `estimated_cost`: USD
- `latency_ms`
- `app`: 'dream'
- `endpoint`: 'interpret'
- `success`, `error_type`

## Architecture

```
User Request
    |
    v
/api/interpret (route.ts)
    |
    v
selectInterpretationModel() -- calls getAIModelFromFlag()
    |                              |
    |                              v
    |                        PostHog getFeatureFlag()
    |                              |
    |                              v
    |                        Returns model ID variant
    |
    v
MODEL_CONFIG[modelId] --> { provider, modelName }
    |
    v
getProvider(provider) --> ClaudeProvider or GeminiProvider
    |
    v
provider.chatStream() --> AI Response
    |
    v
Track to PostHog + Supabase
```

## Testing

1. **Local Testing**: Set environment variable or use PostHog test users
2. **Verify in PostHog**: Check that events are being captured with correct model names
3. **Compare Results**: After sufficient data, compare metrics across variants

## Next Steps

1. [ ] Configure feature flag in PostHog dashboard
2. [ ] Set initial 25% distribution for each variant
3. [ ] Monitor for 1-2 weeks to gather baseline data
4. [ ] Analyze cost/quality/latency trade-offs
5. [ ] Adjust distribution based on findings
