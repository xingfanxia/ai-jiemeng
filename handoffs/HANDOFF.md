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
- **Progress**: APIs, UI, unlock flow, share all done
- **Branch**: main
- **Last Commit**: df5239b - Split interpret API and add share functionality

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
- `AIInterpretation` - 2 tabs (解梦 + 指引), streaming display, two-step unlock
- `SymbolCard` - Symbol details
- `DreamJournal` - Saved dreams list
- `FortuneIndicator` - 大吉/吉/中平/凶/大凶 badge

### Features Implemented This Session
1. **Two-step unlock flow**:
   - 解梦 (interpretation) → FREE, auto-generated
   - 指引 (guidance) → Locked, shows "解锁指引 (1积分)" button
   - Clicking unlock calls `/api/guidance`, deducts 1 credit

2. **Share functionality**:
   - Uses `modern-screenshot` (domToPng)
   - Mobile: native share via Web Share API
   - Desktop: downloads PNG
   - Watermark with "周公解梦" branding

3. **Prompt improvements**:
   - Removed intro text ("你好呀，有缘人"等)
   - Direct interpretation without self-introduction
   - Strict prohibition rules

### Knowledge Base (`src/lib/knowledge/`)
- 70+ dream symbols with traditional interpretations
- Conditions system (五行, 时辰, 反梦, 五不占)
- AI prompts for Zhou Gong style interpretation

## What's Next 🔜

### Testing
1. Test full flow end-to-end (logged in user)
2. Test credit deduction for 指引
3. Test share functionality on mobile
4. Test auth flow (OAuth buttons)

### Polish
5. UI/UX refinements based on testing
6. Error handling edge cases
7. Performance optimization

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
- None critical at this time

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
| 2026-01-11 | Share | modern-screenshot, mobile share |

## Resume Command
```
Resume work on AI周公解梦. Read handoffs/HANDOFF.md first.
Next: Test full flow end-to-end, polish UI
```
