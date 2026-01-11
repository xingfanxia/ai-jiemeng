# Handoff: AI周公解梦App

## Last Updated: 2026-01-11

## Core References
| Document | Path | Purpose |
|----------|------|---------|
| Technical PRD | `docs/AI周公解梦App完整技术方案.md` | Product requirements |
| Research Guide | `docs/中国古代解梦典籍深度研究：AI知识库构建指南.md` | Knowledge base design |
| Progress Tracker | `TODO.md` | Step-by-step tasks |
| Requirements | `memory/requirements-synthesis.md` | Synthesized requirements |

## Current State
- **Phase**: Core Development
- **Progress**: Foundation complete, need API + UI
- **Branch**: main
- **Last Commit**: 7682675 - Add comprehensive dream knowledge base

## What's Done ✅

### Infrastructure
- **GitHub**: https://github.com/xingfanxia/ai-jiemeng
- **Vercel**: Deployed, linked to GitHub (auto-deploy on push)
- **Supabase**: `dream_readings` table with RLS policies

### Knowledge Base (`src/lib/knowledge/`)
- `symbols.ts` - **70+ dream symbols** with:
  - Traditional Zhou Gong interpretations with source texts
  - Conditional variations (孕妇, 商人, 男/女)
  - Freudian interpretations
  - Jungian interpretations
  - Fortune scores and related symbols
- `conditions.ts` - Interpretation conditions:
  - 五行 (Five Elements) system
  - 十二时辰 with dream tendencies
  - 反梦 (reverse dream) logic
  - 五不占 (when NOT to interpret)
- `prompts.ts` - AI system prompts:
  - Multi-perspective interpretation prompts
  - Sensitive content handling
  - Crisis response protocols
- `categories.ts` - 13 symbol categories
- `fortune.ts` - Fortune calculation (大吉/吉/中平/凶/大凶)

### Research Files (`memory/`)
- `research-conditions.md` - Conditional interpretation system
- `research-psychological.md` - Freud/Jung dream theory
- `research-symbols-traditional.md` - Traditional symbols
- `research-symbols-activities-objects.md` - Activities/objects
- `research-symbols-supernatural-people.md` - Supernatural/people

## What's Next 🔜

### Immediate (API)
1. Implement `/api/interpret` - Streaming AI dream interpretation
2. Implement `/api/dreams` - CRUD for dream entries
3. Implement `/api/symbols` - Symbol dictionary lookup

### Then (UI)
4. `DreamForm` component - Dream input with mood/context
5. `AIInterpretation` component - Streaming display
6. `SymbolCard` component - Symbol detail display
7. Main page with dream journal

## Key Architecture Decisions
- **AI Provider**: Gemini 3 Pro default (70%), Claude backup (30%)
- **Knowledge**: TypeScript files in `lib/knowledge/` (not DB)
- **Database**: Only `dream_readings` for user data
- **Auth**: Supabase OAuth (shared with bazi-app)
- **Credits**: Reuse bazi-app credit system

## Environment Variables (Vercel)
All configured:
- Supabase (via integration)
- `ANTHROPIC_API_KEY`
- `GOOGLE_AI_API_KEY`
- `GEMINI_MODEL=gemini-3-pro-preview`
- `AI_DEFAULT_PROVIDER=gemini`

## Session History
| Date | Focus | Outcome |
|------|-------|---------|
| 2026-01-11 | Research | Analyzed bazi-app, synthesized requirements |
| 2026-01-11 | Setup | GitHub, Vercel, Supabase tables |
| 2026-01-11 | Knowledge | 70+ symbols, conditions, prompts |
