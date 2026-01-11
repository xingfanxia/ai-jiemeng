/**
 * Dream Guidance API Route
 *
 * POST /api/guidance
 *
 * Streaming endpoint for AI-powered dream guidance.
 * Requires authentication and costs 1 credit.
 *
 * Request body:
 * {
 *   dreamContent: string;      // Original dream description
 *   interpretation: string;    // The interpretation that was generated
 *   dreamId?: string;          // Optional dream ID for reference
 * }
 *
 * Response: Streaming text with guidance/advice
 */

import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { streamGuidance, type GuidanceRequest } from '@/lib/ai/interpret';
import type { DeductCreditResult } from '@/lib/supabase/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return new Response(
        JSON.stringify({ error: '请先登录后再解锁指引', code: 'UNAUTHORIZED' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Parse request body
    const body = await request.json();
    const { dreamContent, interpretation, dreamId } = body;

    // Validate required fields
    if (!dreamContent || typeof dreamContent !== 'string') {
      return new Response(
        JSON.stringify({ error: '梦境内容不能为空' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (!interpretation || typeof interpretation !== 'string') {
      return new Response(
        JSON.stringify({ error: '解梦结果不能为空' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Deduct credit (costs 1 credit)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: deductResult, error: deductError } = await (supabase as any)
      .rpc('deduct_credit', {
        p_user_id: user.id,
        p_cost: 1,
      }) as { data: DeductCreditResult[] | null; error: Error | null };

    if (deductError) {
      console.error('[Guidance API] Credit deduction error:', deductError);
      return new Response(
        JSON.stringify({ error: '积分扣除失败，请稍后重试', code: 'CREDIT_ERROR' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Check if deduction was successful
    const result = deductResult?.[0];
    if (!result?.success) {
      return new Response(
        JSON.stringify({
          error: result?.error_message || '积分不足，请签到获取更多积分',
          code: 'INSUFFICIENT_CREDITS',
          remaining_credits: result?.remaining_credits ?? 0,
        }),
        {
          status: 402,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Build guidance request
    const guidanceRequest: GuidanceRequest = {
      dreamContent,
      interpretation,
      dreamId,
    };

    // Create a streaming response
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          let provider: string | undefined;

          // Send remaining credits info first
          const creditsEvent = `data: ${JSON.stringify({
            type: 'credits',
            remaining: result.remaining_credits,
          })}\n\n`;
          controller.enqueue(encoder.encode(creditsEvent));

          for await (const chunk of streamGuidance(guidanceRequest)) {
            // Capture provider name from first chunk
            if (chunk.provider && !provider) {
              provider = chunk.provider;
              // Send provider info as SSE event
              const providerEvent = `data: ${JSON.stringify({ type: 'provider', provider })}\n\n`;
              controller.enqueue(encoder.encode(providerEvent));
            }

            if (chunk.content) {
              // Send text chunks
              const textEvent = `data: ${JSON.stringify({ type: 'text', content: chunk.content })}\n\n`;
              controller.enqueue(encoder.encode(textEvent));
            }

            if (chunk.done && chunk.usage) {
              // Send usage info at the end
              const usageEvent = `data: ${JSON.stringify({ type: 'usage', usage: chunk.usage })}\n\n`;
              controller.enqueue(encoder.encode(usageEvent));
            }
          }

          // Send done event
          const doneEvent = `data: ${JSON.stringify({ type: 'done' })}\n\n`;
          controller.enqueue(encoder.encode(doneEvent));

          controller.close();
        } catch (error) {
          console.error('[Guidance API] Stream error:', error);
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          const errorEvent = `data: ${JSON.stringify({ type: 'error', error: errorMessage })}\n\n`;
          controller.enqueue(encoder.encode(errorEvent));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error) {
    console.error('[Guidance API] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate guidance';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
