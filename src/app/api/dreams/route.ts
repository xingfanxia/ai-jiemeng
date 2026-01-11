import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { DreamReadingInsert, DreamType } from '@/lib/supabase/types';

/**
 * GET /api/dreams - List user's dreams (paginated)
 * Query params:
 *   - page: number (default 1)
 *   - limit: number (default 10, max 50)
 *   - type: 'normal' | 'nightmare' | 'lucid' | 'recurring' | 'prenatal'
 * Returns: { dreams, total, page, limit, hasMore }
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'AUTH_REQUIRED', message: '请先登录' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(Math.max(1, parseInt(searchParams.get('limit') || '10')), 50);
    const dreamType = searchParams.get('type') as DreamType | null;
    const offset = (page - 1) * limit;

    // Build query
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query = (supabase.from('dream_readings') as any)
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .order('dream_date', { ascending: false })
      .order('created_at', { ascending: false });

    // Filter by dream type if provided
    if (dreamType && ['normal', 'nightmare', 'lucid', 'recurring', 'prenatal'].includes(dreamType)) {
      query = query.eq('dream_type', dreamType);
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data: dreams, error, count } = await query;

    if (error) {
      console.error('[Dreams API] Get dreams error:', error);
      return NextResponse.json(
        { error: 'FETCH_ERROR', message: '获取梦境记录失败' },
        { status: 500 }
      );
    }

    const total = count || 0;
    const hasMore = offset + limit < total;

    return NextResponse.json({
      dreams: dreams || [],
      total,
      page,
      limit,
      hasMore,
    });
  } catch (error) {
    console.error('[Dreams API] Error:', error);
    return NextResponse.json(
      { error: 'SERVER_ERROR', message: '服务器错误' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/dreams - Create new dream entry
 * Body: {
 *   title?: string;
 *   content: string;
 *   dream_date?: string;
 *   mood_before?: { emotion: string; intensity: number };
 *   mood_after?: { emotion: string; intensity: number };
 *   clarity?: number;
 *   vividness?: number;
 *   dream_type?: 'normal' | 'nightmare' | 'lucid' | 'recurring' | 'prenatal';
 *   extracted_symbols?: string[];
 *   interpretations?: object;
 *   fortune_score?: number;
 *   fortune_type?: '大吉' | '吉' | '中平' | '凶' | '大凶';
 *   source?: 'manual' | 'voice' | 'credit_unlock';
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'AUTH_REQUIRED', message: '请先登录' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate required fields
    if (!body.content || typeof body.content !== 'string') {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', message: '梦境内容不能为空' },
        { status: 400 }
      );
    }

    // Validate content length
    if (body.content.length > 10000) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', message: '梦境内容过长(最多10000字)' },
        { status: 400 }
      );
    }

    // Validate clarity and vividness ranges
    if (body.clarity !== undefined && (body.clarity < 1 || body.clarity > 10)) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', message: '清晰度必须在1-10之间' },
        { status: 400 }
      );
    }

    if (body.vividness !== undefined && (body.vividness < 1 || body.vividness > 10)) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', message: '生动度必须在1-10之间' },
        { status: 400 }
      );
    }

    // Validate fortune_score range
    if (body.fortune_score !== undefined && (body.fortune_score < 0 || body.fortune_score > 100)) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', message: '运势分数必须在0-100之间' },
        { status: 400 }
      );
    }

    // Validate dream_type
    const validDreamTypes = ['normal', 'nightmare', 'lucid', 'recurring', 'prenatal'];
    if (body.dream_type && !validDreamTypes.includes(body.dream_type)) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', message: '无效的梦境类型' },
        { status: 400 }
      );
    }

    // Validate fortune_type
    const validFortuneTypes = ['大吉', '吉', '中平', '凶', '大凶'];
    if (body.fortune_type && !validFortuneTypes.includes(body.fortune_type)) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', message: '无效的运势类型' },
        { status: 400 }
      );
    }

    // Validate source
    const validSources = ['manual', 'voice', 'credit_unlock'];
    const source = body.source && validSources.includes(body.source) ? body.source : 'manual';

    // Build dream record
    const dream: DreamReadingInsert = {
      user_id: user.id,
      title: body.title || null,
      content: body.content,
      dream_date: body.dream_date || new Date().toISOString().split('T')[0],
      mood_before: body.mood_before || null,
      mood_after: body.mood_after || null,
      clarity: body.clarity || null,
      vividness: body.vividness || null,
      dream_type: body.dream_type || 'normal',
      extracted_symbols: body.extracted_symbols || [],
      interpretations: body.interpretations || null,
      fortune_score: body.fortune_score || null,
      fortune_type: body.fortune_type || null,
      source: source,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from('dream_readings') as any)
      .insert(dream)
      .select()
      .single();

    if (error) {
      // Check for limit exceeded error
      if (error.message?.includes('limit reached')) {
        return NextResponse.json(
          { error: 'LIMIT_EXCEEDED', message: '已达到梦境记录上限，请删除旧记录或升级账户' },
          { status: 403 }
        );
      }
      console.error('[Dreams API] Save dream error:', error);
      return NextResponse.json(
        { error: 'SAVE_ERROR', message: '保存梦境失败' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      dream: data,
    }, { status: 201 });
  } catch (error) {
    console.error('[Dreams API] Error:', error);
    return NextResponse.json(
      { error: 'SERVER_ERROR', message: '服务器错误' },
      { status: 500 }
    );
  }
}
