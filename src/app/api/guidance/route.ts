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
import { logLlmCost, calculateCostFromModelName, PROVIDER_CONFIG } from '@/lib/ai';
import type { AIProviderType } from '@/lib/ai/types';
import type { DeductCreditResult } from '@/lib/supabase/types';
import { captureServerEvent, flushPostHog } from '@/lib/posthog';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let userId: string | undefined;

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

    userId = user.id;

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
    // Session 58: Unified credit pool - daily_credits merged into total_credits
    const remainingCredits = result?.remaining_total || 0;

    if (!result?.success) {
      return new Response(
        JSON.stringify({
          error: result?.error_message || '积分不足，请签到获取更多积分',
          code: 'INSUFFICIENT_CREDITS',
          remaining_credits: remainingCredits,
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

    // Capture input content length for token estimation
    const inputContentLength = dreamContent.length + interpretation.length;

    const stream = new ReadableStream({
      async start(controller) {
        let providerName: string | undefined;
        let providerType: AIProviderType = 'gemini'; // Default
        let outputCharCount = 0;
        let streamUsage: { inputTokens: number; outputTokens: number } | undefined;
        let streamSuccess = true;

        try {
          // Send remaining credits info first (including referral bonus if claimed)
          const creditsEventData: {
            type: 'credits';
            remaining: number;
            referralBonusClaimed?: boolean;
            referralBonusAmount?: number;
          } = {
            type: 'credits',
            remaining: remainingCredits,
          };

          // Add referral bonus info if bonus was claimed
          if (result?.referral_bonus_claimed) {
            creditsEventData.referralBonusClaimed = true;
            creditsEventData.referralBonusAmount = result.referral_bonus_amount || 0;
          }

          const creditsEvent = `data: ${JSON.stringify(creditsEventData)}\n\n`;
          controller.enqueue(encoder.encode(creditsEvent));

          for await (const chunk of streamGuidance(guidanceRequest)) {
            // Capture provider name from first chunk
            if (chunk.provider && !providerName) {
              providerName = chunk.provider;
              // Determine provider type from name
              providerType = providerName.toLowerCase().includes('claude') ? 'claude' : 'gemini';
              // Send provider info as SSE event
              const providerEvent = `data: ${JSON.stringify({ type: 'provider', provider: providerName })}\n\n`;
              controller.enqueue(encoder.encode(providerEvent));
            }

            if (chunk.content) {
              outputCharCount += chunk.content.length;
              // Send text chunks
              const textEvent = `data: ${JSON.stringify({ type: 'text', content: chunk.content })}\n\n`;
              controller.enqueue(encoder.encode(textEvent));
            }

            if (chunk.done && chunk.usage) {
              streamUsage = chunk.usage;
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
          streamSuccess = false;
          console.error('[Guidance API] Stream error:', error);
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          const errorEvent = `data: ${JSON.stringify({ type: 'error', error: errorMessage })}\n\n`;
          controller.enqueue(encoder.encode(errorEvent));
          controller.close();

          // Log error cost
          const latencyMs = Date.now() - startTime;
          const modelName = PROVIDER_CONFIG[providerType].model;
          logLlmCost({
            provider: providerType,
            model: modelName,
            inputTokens: 0,
            outputTokens: 0,
            estimatedCost: 0,
            latencyMs,
            endpoint: 'guidance',
            success: false,
            errorType: errorMessage.includes('EMPTY_RESPONSE') ? 'empty_response' : 'streaming_error',
            userId,
            metadata: { streaming: true },
          });
        }

        // Log successful streaming request
        if (streamSuccess) {
          const latencyMs = Date.now() - startTime;
          const modelName = PROVIDER_CONFIG[providerType].model;
          // Use real usage data if available, otherwise estimate from char count
          const hasRealUsage = streamUsage && (streamUsage.inputTokens > 0 || streamUsage.outputTokens > 0);
          const inputTokens = hasRealUsage ? streamUsage!.inputTokens : Math.ceil(inputContentLength / 4);
          const outputTokens = hasRealUsage ? streamUsage!.outputTokens : Math.ceil(outputCharCount / 4);
          const estimatedCost = calculateCostFromModelName(modelName, inputTokens, outputTokens);

          logLlmCost({
            provider: providerType,
            model: modelName,
            inputTokens,
            outputTokens,
            estimatedCost,
            latencyMs,
            endpoint: 'guidance',
            success: true,
            userId,
            metadata: {
              streaming: true,
              outputCharCount,
              tokensEstimated: !hasRealUsage,
            },
          });

          // Track LLM generation event with PostHog
          captureServerEvent(userId || 'anonymous', '$ai_generation', {
            $ai_provider: providerType,
            $ai_model: modelName,
            $ai_input_tokens: inputTokens,
            $ai_output_tokens: outputTokens,
            $ai_latency: latencyMs,
            endpoint: 'jiemeng/guidance',
            success: true,
            streaming: true,
          });

          // Flush PostHog events before serverless function terminates
          await flushPostHog();
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

    // Log error
    const latencyMs = Date.now() - startTime;
    logLlmCost({
      provider: 'gemini',
      model: PROVIDER_CONFIG.gemini.model,
      inputTokens: 0,
      outputTokens: 0,
      estimatedCost: 0,
      latencyMs,
      endpoint: 'guidance',
      success: false,
      errorType: 'request_error',
      userId,
      metadata: { error: errorMessage },
    });

    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
