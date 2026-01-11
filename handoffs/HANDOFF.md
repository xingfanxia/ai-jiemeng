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
- **Phase**: Core Development Complete
- **Progress**: All features working, cost logging added
- **Branch**: main
- **Last Commit**: 953a024 - Rewrite export to match bazi-app pattern
- **Live**: https://jiemeng.ax0x.ai

## What's Done ✅

### Infrastructure
- **GitHub**: https://github.com/xingfanxia/ai-jiemeng
- **Vercel**: Deployed, linked to GitHub (auto-deploy on push)
- **Supabase**: `dream_readings` table with RLS policies
- **Domain**: https://jiemeng.ax0x.ai

### APIs
| Endpoint | Method | Purpose | Cost |
|----------|--------|---------|------|
| `/api/interpret` | POST | Streaming AI dream interpretation (解梦) | FREE |
| `/api/guidance` | POST | Streaming AI guidance (指引) | 1 credit |
| `/api/dreams` | GET/POST | List & create dreams | - |
| `/api/dreams/[id]` | GET/PUT/DELETE | Single dream CRUD | - |
| `/api/symbols` | GET | Search symbol dictionary | - |
| `/api/symbols/[name]` | GET | Get symbol details | - |
| `/api/credits` | GET | User credits + daily check-in | - |
| `/auth/callback` | GET | OAuth callback handler | - |

### UI Components
- `DreamForm` - Dream input with 十二时辰, mood, context
- `AIInterpretation` - 2 tabs (解梦 + 指引), streaming display, two-step unlock
- `SymbolCard` - Symbol details
- `DreamJournal` - Saved dreams list
- `FortuneIndicator` - 大吉/吉/中平/凶/大凶 badge

### Features Completed
1. **Two-step unlock flow**:
   - 解梦 (interpretation) → FREE, auto-generated
   - 指引 (guidance) → Locked, shows "解锁指引 (1积分)" button
   - Clicking unlock calls `/api/guidance`, deducts 1 credit
   - Credits refresh after unlock

2. **Share functionality** (same as bazi-app):
   - Uses `modern-screenshot` (domToPng)
   - Mobile: native share via Web Share API
   - Desktop: downloads PNG (`周公解梦-timestamp.png`)
   - Watermark with branding

3. **Prompt style**:
   - 优雅古韵, can quote classical texts
   - NO intro ("你好呀，有缘人" removed)
   - Direct interpretation
   - Prohibitions: Freud/Jung, fabrication, scary language

4. **Cost Logging** (shared `llm_costs` table with bazi-app):
   - Logs to Supabase `llm_costs` table
   - `app = 'dream'`
   - Endpoints: `interpret`, `guidance`
   - Tracks: provider, model, tokens, cost, latency, errors

### Knowledge Base (`src/lib/knowledge/`)
- 70+ dream symbols with traditional interpretations
- Conditions system (五行, 时辰, 反梦, 五不占)
- AI prompts for Zhou Gong style interpretation

## Bug Fixes This Session
1. ✅ Guidance unlock button disabled after interpretation complete → Fixed `data.type === 'done'` check
2. ✅ Share/download not working → Rewrote to match bazi-app pattern exactly
3. ✅ Credits not refreshing after unlock → Added `refreshCredits()` call
4. ✅ Prompt too literary → Restored original style, only removed intro

## Cost Logging Setup

For dashboard integration:
- **Table**: `llm_costs` (shared with bazi-app)
- **App identifier**: `app = 'dream'`
- **Endpoints**: `interpret` (free), `guidance` (1 credit)
- **Providers**: `gemini` (primary), `claude` (backup)

Sample query:
```sql
SELECT DATE(created_at), endpoint, COUNT(*), SUM(estimated_cost)
FROM llm_costs WHERE app = 'dream'
GROUP BY DATE(created_at), endpoint;
```

## Key Architecture Decisions
- **AI Provider**: Gemini 3 Pro default (70%), Claude backup (30%)
- **Knowledge**: TypeScript files in `lib/knowledge/` (not DB)
- **Database**: Only `dream_readings` for user data
- **Auth**: Supabase OAuth (shared with bazi-app)
- **Credits**: Reuse bazi-app credit system (deduct_credit RPC)
- **Cost Logging**: Shared `llm_costs` table with bazi-app

## Environment Variables (Vercel)
All configured:
- Supabase (via integration)
- `ANTHROPIC_API_KEY`
- `GOOGLE_AI_API_KEY`
- `GEMINI_MODEL=gemini-3-pro-preview`
- `AI_DEFAULT_PROVIDER=gemini`

## What's Next 🔜
1. Test full flow on mobile
2. Polish UI based on user feedback
3. Add more dream symbols to knowledge base
4. Dashboard integration (cost analytics)

## Session History
| Date | Focus | Outcome |
|------|-------|---------|
| 2026-01-11 | Research | Analyzed bazi-app, synthesized requirements |
| 2026-01-11 | Setup | GitHub, Vercel, Supabase tables |
| 2026-01-11 | Knowledge | 70+ symbols, conditions, prompts |
| 2026-01-11 | APIs | interpret, dreams, symbols, credits |
| 2026-01-11 | UI | DreamForm, AIInterpretation, 2-tab design |
| 2026-01-11 | Prompt | Remove Freud/Jung, fix hallucination |
| 2026-01-11 | Split API | interpret (free) + guidance (credits) |
| 2026-01-11 | Share | modern-screenshot, bazi-app pattern |
| 2026-01-11 | Bugs | Fix unlock, share download, credits refresh |
| 2026-01-11 | Logging | Add cost logging to llm_costs table |

## Resume Command
```
Resume work on AI周公解梦. Read handoffs/HANDOFF.md first.
```
