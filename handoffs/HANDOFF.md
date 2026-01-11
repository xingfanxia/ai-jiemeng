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
- **Phase**: Core Development Complete, UX Refinement
- **Progress**: APIs + UI done, prompt tuning in progress
- **Branch**: main
- **Last Commit**: 02fc37b - Fix Freud/Jung prohibition

## What's Done ✅

### Infrastructure
- **GitHub**: https://github.com/xingfanxia/ai-jiemeng
- **Vercel**: Deployed, linked to GitHub (auto-deploy on push)
- **Supabase**: `dream_readings` table with RLS policies
- **Domain**: https://jiemeng.ax0x.ai

### APIs
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/interpret` | POST | FREE streaming AI dream interpretation (解梦 only) |
| `/api/guidance` | POST | Streaming AI guidance (指引), costs 1 credit |
| `/api/dreams` | GET/POST | List & create dreams |
| `/api/dreams/[id]` | GET/PUT/DELETE | Single dream CRUD |
| `/api/symbols` | GET | Search symbol dictionary |
| `/api/symbols/[name]` | GET | Get symbol details |
| `/api/credits` | GET | User credits + daily check-in |
| `/auth/callback` | GET | OAuth callback handler |

### UI Components
- `DreamForm` - Dream input with 十二时辰, mood, context
- `AIInterpretation` - 2 tabs (解梦 + 指引), streaming display
- `SymbolCard` - Symbol details
- `DreamJournal` - Saved dreams list
- `FortuneIndicator` - 大吉/吉/中平/凶/大凶 badge

### Knowledge Base (`src/lib/knowledge/`)
- 70+ dream symbols with traditional interpretations
- Conditions system (五行, 时辰, 反梦, 五不占)
- AI prompts for Zhou Gong style interpretation

## What's In Progress 🔄

### Prompt Tuning
- ✅ Removed Freud/Jung Western psychology
- ✅ Added prohibition against AI fabricating user statements
- ✅ Split into two endpoints (解梦 free, 指引 costs credits)

### API Split Complete
Two separate endpoints as requested:
1. **`/api/interpret`** → FREE, generates 解梦 only (no guidance)
2. **`/api/guidance`** → Costs 1 credit, generates 指引 only

Both use streaming SSE format.

## What's Next 🔜

### Immediate (Based on User Feedback)
1. ✅ ~~Decide unlock flow~~ - Two-step with credits implemented
2. ✅ ~~Create `/api/guidance` endpoint~~ - Done with credit deduction
3. **Update `AIInterpretation` component** to show unlock button for 指引

### Then
4. Test full flow end-to-end
5. Auth integration (OAuth buttons working)
6. Polish UI/UX

## Key Architecture Decisions
- **AI Provider**: Gemini 3 Pro default (70%), Claude backup (30%)
- **Knowledge**: TypeScript files in `lib/knowledge/` (not DB)
- **Database**: Only `dream_readings` for user data
- **Auth**: Supabase OAuth (shared with bazi-app)
- **Credits**: Reuse bazi-app credit system (deduct_credit RPC)

## Environment Variables (Vercel)
All configured:
- Supabase (via integration)
- `ANTHROPIC_API_KEY`
- `GOOGLE_AI_API_KEY`
- `GEMINI_MODEL=gemini-3-pro-preview`
- `AI_DEFAULT_PROVIDER=gemini`

## Known Issues
- AI sometimes still mentions things user didn't say (prompt issue)
- Unlock flow not implemented yet

## Session History
| Date | Focus | Outcome |
|------|-------|---------|
| 2026-01-11 | Research | Analyzed bazi-app, synthesized requirements |
| 2026-01-11 | Setup | GitHub, Vercel, Supabase tables |
| 2026-01-11 | Knowledge | 70+ symbols, conditions, prompts |
| 2026-01-11 | APIs | interpret, dreams, symbols, credits |
| 2026-01-11 | UI | DreamForm, AIInterpretation, 2-tab design |
| 2026-01-11 | Prompt | Remove Freud/Jung, fix hallucination |

## Resume Command
```
Resume work on AI周公解梦. Read handoffs/HANDOFF.md first.
Next: Decide on unlock flow (one-shot vs two-step with credits)
```
