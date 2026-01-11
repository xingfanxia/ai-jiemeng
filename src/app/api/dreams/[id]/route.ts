import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { DreamReadingUpdate } from '@/lib/supabase/types';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/dreams/[id] - Get a single dream by ID
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'AUTH_REQUIRED', message: '请先登录' },
        { status: 401 }
      );
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', message: '无效的梦境ID' },
        { status: 400 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: dream, error } = await (supabase.from('dream_readings') as any)
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)  // RLS enforces this, but explicit for clarity
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'NOT_FOUND', message: '梦境记录不存在' },
          { status: 404 }
        );
      }
      console.error('[Dreams API] Get dream error:', error);
      return NextResponse.json(
        { error: 'FETCH_ERROR', message: '获取梦境失败' },
        { status: 500 }
      );
    }

    return NextResponse.json({ dream });
  } catch (error) {
    console.error('[Dreams API] Error:', error);
    return NextResponse.json(
      { error: 'SERVER_ERROR', message: '服务器错误' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/dreams/[id] - Update a dream
 * Body: Partial dream fields to update
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'AUTH_REQUIRED', message: '请先登录' },
        { status: 401 }
      );
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', message: '无效的梦境ID' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validate fields if provided
    if (body.content !== undefined && (!body.content || typeof body.content !== 'string')) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', message: '梦境内容不能为空' },
        { status: 400 }
      );
    }

    if (body.content && body.content.length > 10000) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', message: '梦境内容过长(最多10000字)' },
        { status: 400 }
      );
    }

    if (body.clarity !== undefined && body.clarity !== null && (body.clarity < 1 || body.clarity > 10)) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', message: '清晰度必须在1-10之间' },
        { status: 400 }
      );
    }

    if (body.vividness !== undefined && body.vividness !== null && (body.vividness < 1 || body.vividness > 10)) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', message: '生动度必须在1-10之间' },
        { status: 400 }
      );
    }

    if (body.fortune_score !== undefined && body.fortune_score !== null && (body.fortune_score < 0 || body.fortune_score > 100)) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', message: '运势分数必须在0-100之间' },
        { status: 400 }
      );
    }

    const validDreamTypes = ['normal', 'nightmare', 'lucid', 'recurring', 'prenatal'];
    if (body.dream_type !== undefined && !validDreamTypes.includes(body.dream_type)) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', message: '无效的梦境类型' },
        { status: 400 }
      );
    }

    const validFortuneTypes = ['大吉', '吉', '中平', '凶', '大凶'];
    if (body.fortune_type !== undefined && body.fortune_type !== null && !validFortuneTypes.includes(body.fortune_type)) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', message: '无效的运势类型' },
        { status: 400 }
      );
    }

    // Build update object - only include fields that were provided
    const updateData: DreamReadingUpdate = {};

    if (body.title !== undefined) updateData.title = body.title;
    if (body.content !== undefined) updateData.content = body.content;
    if (body.dream_date !== undefined) updateData.dream_date = body.dream_date;
    if (body.mood_before !== undefined) updateData.mood_before = body.mood_before;
    if (body.mood_after !== undefined) updateData.mood_after = body.mood_after;
    if (body.clarity !== undefined) updateData.clarity = body.clarity;
    if (body.vividness !== undefined) updateData.vividness = body.vividness;
    if (body.dream_type !== undefined) updateData.dream_type = body.dream_type;
    if (body.extracted_symbols !== undefined) updateData.extracted_symbols = body.extracted_symbols;
    if (body.interpretations !== undefined) updateData.interpretations = body.interpretations;
    if (body.fortune_score !== undefined) updateData.fortune_score = body.fortune_score;
    if (body.fortune_type !== undefined) updateData.fortune_type = body.fortune_type;
    if (body.chat_messages !== undefined) updateData.chat_messages = body.chat_messages;

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', message: '没有提供要更新的字段' },
        { status: 400 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from('dream_readings') as any)
      .update(updateData)
      .eq('id', id)
      .eq('user_id', user.id)  // RLS enforces this, but explicit for security
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'NOT_FOUND', message: '梦境记录不存在' },
          { status: 404 }
        );
      }
      console.error('[Dreams API] Update dream error:', error);
      return NextResponse.json(
        { error: 'UPDATE_ERROR', message: '更新梦境失败' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      dream: data,
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
 * DELETE /api/dreams/[id] - Delete a dream
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'AUTH_REQUIRED', message: '请先登录' },
        { status: 401 }
      );
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', message: '无效的梦境ID' },
        { status: 400 }
      );
    }

    // First check if the dream exists and belongs to user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: existing } = await (supabase.from('dream_readings') as any)
      .select('id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (!existing) {
      return NextResponse.json(
        { error: 'NOT_FOUND', message: '梦境记录不存在' },
        { status: 404 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from('dream_readings') as any)
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);  // RLS enforces this, but explicit for security

    if (error) {
      console.error('[Dreams API] Delete dream error:', error);
      return NextResponse.json(
        { error: 'DELETE_ERROR', message: '删除梦境失败' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Dreams API] Error:', error);
    return NextResponse.json(
      { error: 'SERVER_ERROR', message: '服务器错误' },
      { status: 500 }
    );
  }
}
