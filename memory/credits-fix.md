# Credits System Fix

## Date: 2026-01-14

## Problem
User reported: "解锁积分不变化 既不增长也不扣分" (unlock credits don't change - neither increase nor decrease)

## Root Cause
The `/api/credits/route.ts` was using **direct table queries** with **wrong column names** instead of using the shared `get_credits` RPC function.

### What Was Wrong

**Old Code** (broken):
```typescript
const { data: profile, error } = await supabase
  .from('user_profiles')
  .select('credits, last_check_in')  // WRONG COLUMN NAMES!
  .eq('id', user.id)
  .single();
```

**Actual Database Schema** (shared with bazi-app):
- `total_credits` (not `credits`)
- `last_checkin_date` (not `last_check_in`)
- `daily_credits`, `daily_credits_reset_at`

The query would always fail, causing the API to return default values (10 credits) regardless of actual balance.

### Why Deduction Appeared to Not Work
1. Credits display always showed defaults (not actual DB value)
2. `deduct_credit` RPC was working correctly, deducting from DB
3. But UI never reflected changes because `get_credits` wasn't being called
4. User saw same credits number before/after unlock (both were wrong defaults)

## Fix Applied
Replaced direct table query with `get_credits` RPC call (matching bazi-app pattern):

```typescript
const { data, error } = await (supabase.rpc as any)('get_credits', {
  p_user_id: user.id,
});
```

**File Changed:** `/src/app/api/credits/route.ts`

## How Credits System Works (Reference)
- Both apps share same Supabase database
- `get_credits` RPC: Returns credits + awards daily bonus if not claimed
- `deduct_credit` RPC: Atomically deducts credits, returns remaining
- Daily bonus: +2 credits automatically on first API call each day
- New users: 10 initial credits + trigger on `auth.users` creates profile

## Testing
After fix:
1. Credits badge should show actual balance from DB
2. Using guidance (1 credit) should decrease displayed credits
3. First API call of day should award +2 bonus and trigger toast
