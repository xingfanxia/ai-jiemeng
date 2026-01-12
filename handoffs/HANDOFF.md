# Handoff: AI周公解梦App

## Last Updated: 2026-01-12

## Core References
| Document | Path | Purpose |
|----------|------|---------|
| Technical PRD | `docs/AI周公解梦App完整技术方案.md` | Product requirements |
| Research Guide | `docs/中国古代解梦典籍深度研究：AI知识库构建指南.md` | Knowledge base design |
| Progress Tracker | `TODO.md` | Step-by-step tasks |
| Requirements | `memory/requirements-synthesis.md` | Synthesized requirements |

## Current State
- **Phase**: Core Development Complete
- **Progress**: All features working, export bug fixed
- **Branch**: main
- **Last Commit**: 2228218 - Replace emojis with Lucide icons to fix Safari/WeChat export
- **Live**: https://jiemeng.ax0x.ai

## What's Done

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
- `DreamForm` - Dream input with 十二时辰, multi-select mood (Lucide icons), context
- `AIInterpretation` - 2 tabs (解梦 + 指引), streaming display, two-step unlock
- `SymbolCard` - Symbol details
- `DreamJournal` - Saved dreams list with mood icons
- `FortuneIndicator` - 大吉/吉/中平/凶/大凶 badge

### Features Completed
1. **Two-step unlock flow**:
   - 解梦 (interpretation) → FREE, auto-generated
   - 指引 (guidance) → Locked, shows "解锁指引 (1积分)" button
   - Clicking unlock calls `/api/guidance`, deducts 1 credit
   - Credits refresh after unlock

2. **Share functionality** (matching bazi-app):
   - Uses `modern-screenshot` (domToPng)
   - Mobile: native share via Web Share API
   - Desktop: downloads PNG (`周公解梦-timestamp.png`)
   - Watermark with branding (header + footer)
   - **No emojis** - uses Lucide icons for Safari/WeChat compatibility

3. **Multi-select mood**:
   - Users can select multiple emotions for complex dreams
   - Uses Lucide icons instead of emojis
   - Icons: CloudSun, Smile, AlertTriangle, Ghost, HelpCircle, Compass, History, HeartHandshake, Eye, Minus

4. **Advanced options fully working**:
   - 做梦日期 → affects season calculation (春夏秋冬)
   - 做梦时辰 → affects time context
   - 性别/孕妇 → passed to AI for context

5. **Cost Logging** (shared `llm_costs` table with bazi-app):
   - Logs to Supabase `llm_costs` table
   - `app = 'dream'`
   - Endpoints: `interpret`, `guidance`
   - Tracks: provider, model, tokens, cost, latency, errors

### Knowledge Base (`src/lib/knowledge/`)
- 70+ dream symbols with traditional interpretations
- Conditions system (五行, 时辰, 反梦, 五不占)
- AI prompts for Zhou Gong style interpretation (no emojis)

## Bug Fixes This Session (2026-01-12)

| Bug | Root Cause | Fix |
|-----|------------|-----|
| Export fails on Safari/WeChat | Emojis cause canvas rendering failure | Replaced all emojis with Lucide icons |
| Only first watermark shows | `querySelector` only gets first element | Changed to `querySelectorAll` |
| Scrollable area truncated in export | Container not expanded | Added scroll expansion logic |
| dreamDate not affecting season | Season always used current date | Added `getSeasonFromDate()` function |
| Mood single-select | User request for multi-select | Changed to array with toggle |
| Char count shows "5,000" | toLocaleString comma confusing | Changed to "5000字" format |

## Key Architecture Decisions
- **AI Provider**: Gemini 3 Pro default (70%), Claude backup (30%)
- **Knowledge**: TypeScript files in `lib/knowledge/` (not DB)
- **Database**: Only `dream_readings` for user data
- **Auth**: Supabase OAuth (shared with bazi-app)
- **Credits**: Reuse bazi-app credit system (deduct_credit RPC)
- **Cost Logging**: Shared `llm_costs` table with bazi-app
- **Icons over Emojis**: All UI uses Lucide icons for cross-browser compatibility

## Environment Variables (Vercel)
All configured:
- Supabase (via integration)
- `ANTHROPIC_API_KEY`
- `GOOGLE_AI_API_KEY`
- `GEMINI_MODEL=gemini-3-pro-preview`
- `AI_DEFAULT_PROVIDER=gemini`

## What's Next
1. Test export on Safari/WeChat (should be fixed now)
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
| 2026-01-12 | Mood | Multi-select moods, clearer char count |
| 2026-01-12 | dreamDate | Fix season calculation from dream date |
| 2026-01-12 | Export | Fix Safari/WeChat - replace emojis with Lucide icons |

## Resume Command
```
Resume work on AI周公解梦. Read handoffs/HANDOFF.md first.
```
