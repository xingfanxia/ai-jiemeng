# AI周公解梦App - Implementation Plan

## Project Overview
Build a production-ready AI dream interpretation app reusing bazi-app infrastructure.

## Research Summary
- **Tech Stack**: Next.js 16 + React 19 + Tailwind 4 + Supabase + Vercel
- **AI Providers**: Claude Opus 4.5 + Gemini 3 Pro (A/B testing)
- **Auth**: Supabase OAuth (Google, Email OTP)
- **Credits**: Unified credit system with atomic RPC functions
- **Knowledge Base**: 7000+ dream symbols with conditional interpretations

---

## Phase 1: Foundation Setup

### Step 1: Project Initialization
- [ ] Initialize Next.js 16 app with TypeScript
- [ ] Copy shared infrastructure from bazi-app:
  - `src/lib/supabase/` - Database client
  - `src/lib/ai/` - AI provider abstraction
  - `src/components/ui/` - Base UI components
  - `src/components/auth/` - Auth components
- [ ] Configure Tailwind with dream theme colors
- [ ] Set up environment variables

### Step 2: Database Schema
- [ ] Create `dream_readings` table (replaces bazi_readings)
- [ ] Create `dream_symbols` table (knowledge base)
- [ ] Create `dream_interpretations` table
- [ ] Set up RLS policies
- [ ] Create credit integration (reuse user_profiles)

### Step 3: Knowledge Base Seeding
- [ ] Create JSON schema for dream symbols
- [ ] Import core symbols (~500 P0 entries)
- [ ] Build symbol search functionality
- [ ] Implement condition-based filtering

---

## Phase 2: Core Features

### Step 4: Dream Recording API
- [ ] POST `/api/dreams` - Create dream entry
- [ ] GET `/api/dreams` - List user dreams
- [ ] GET `/api/dreams/[id]` - Get dream detail
- [ ] DELETE `/api/dreams/[id]` - Delete dream

### Step 5: AI Interpretation Engine
- [ ] Create dream interpretation prompt template
- [ ] Implement symbol extraction (NER)
- [ ] POST `/api/interpret` - Stream interpretation
- [ ] POST `/api/chat` - Follow-up Q&A
- [ ] Add sensitive content detection

### Step 6: Symbol Dictionary API
- [ ] GET `/api/symbols` - Search symbols
- [ ] GET `/api/symbols/[id]` - Symbol detail
- [ ] Implement semantic search with embeddings

---

## Phase 3: Frontend

### Step 7: Dream Input Interface
- [ ] DreamForm component (text input)
- [ ] Voice recording integration
- [ ] Emotion/mood selector
- [ ] Context fields (dreamer profile)

### Step 8: Interpretation Display
- [ ] AIInterpretation component (streaming)
- [ ] MarkdownText renderer
- [ ] Symbol highlights with tooltips
- [ ] Share/export functionality

### Step 9: Dream Journal
- [ ] Calendar heatmap view
- [ ] Dream history list
- [ ] Search and filter
- [ ] Statistics dashboard

---

## Phase 4: Polish

### Step 10: Internationalization
- [ ] Set up i18next
- [ ] Chinese (Simplified) - complete
- [ ] English - core strings
- [ ] Traditional Chinese - derive from Simplified

### Step 11: Mobile Optimization
- [ ] Responsive layouts
- [ ] Touch interactions
- [ ] PWA manifest
- [ ] iOS safe area handling

### Step 12: Testing & Deployment
- [ ] API route tests
- [ ] E2E tests (Playwright)
- [ ] Vercel deployment config
- [ ] Environment setup

---

## Progress Log
| Date | Step | Status | Notes |
|------|------|--------|-------|
| 2026-01-11 | Research | ✅ | Architecture analysis complete |
| 2026-01-11 | Step 1 | 🔄 | In progress |
