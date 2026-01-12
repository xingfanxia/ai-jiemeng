/**
 * Dream Interpretation API Route
 *
 * POST /api/interpret
 *
 * FREE streaming endpoint for AI-powered dream interpretation.
 * Uses Zhou Gong (周公解梦) traditional Chinese interpretation.
 *
 * NOTE: This endpoint ONLY generates the interpretation (解梦) part.
 * For guidance (指引), users need to call /api/guidance which costs credits.
 *
 * Request body:
 * {
 *   content: string;          // Dream description
 *   dreamDate?: string;       // For 时辰 calculation
 *   dreamTime?: string;       // Hour of dream (子时, 丑时, etc.)
 *   moods?: string[];         // User's moods
 *   context?: {               // Additional context
 *     isPregnant?: boolean;
 *     occupation?: string;
 *     gender?: 'male' | 'female';
 *   }
 * }
 *
 * Response: Streaming text with dream interpretation (no guidance)
 */

import { NextRequest } from 'next/server';
import { streamDreamInterpretation, type InterpretationRequest } from '@/lib/ai/interpret';
import { logLlmCost, calculateCostFromModelName, PROVIDER_CONFIG } from '@/lib/ai';
import type { AIProviderType } from '@/lib/ai/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await request.json();
    // Accept both 'content' and 'dreamContent' field names
    const { content, dreamContent, dreamDate, dreamTime, moods, context } = body;
    const dreamText = content || dreamContent;

    // Validate required field
    if (!dreamText || typeof dreamText !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Dream content is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate content length (prevent abuse)
    if (dreamText.length > 5000) {
      return new Response(
        JSON.stringify({ error: 'Dream content is too long (max 5000 characters)' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Build interpretation request
    const interpretRequest: InterpretationRequest = {
      content: dreamText,
      dreamDate,
      dreamTime,
      moods,  // Pass moods array
      context: context ? {
        isPregnant: context.isPregnant,
        occupation: context.occupation,
        gender: context.gender,
      } : undefined,
    };

    // Create a streaming response
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        let providerName: string | undefined;
        let providerType: AIProviderType = 'gemini'; // Default
        let outputCharCount = 0;
        let streamUsage: { inputTokens: number; outputTokens: number } | undefined;
        let streamSuccess = true;

        try {
          for await (const chunk of streamDreamInterpretation(interpretRequest)) {
            // Capture provider name from first chunk
            if (chunk.provider && !providerName) {
              providerName = chunk.provider;
              // Determine provider type from name
              providerType = providerName.toLowerCase().includes('claude') ? 'claude' : 'gemini';
              // Send provider info as first SSE event
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
          console.error('[Dream Interpret API] Stream error:', error);
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
            endpoint: 'interpret',
            success: false,
            errorType: errorMessage.includes('EMPTY_RESPONSE') ? 'empty_response' : 'streaming_error',
            metadata: { streaming: true },
          });
        }

        // Log successful streaming request
        if (streamSuccess) {
          const latencyMs = Date.now() - startTime;
          const modelName = PROVIDER_CONFIG[providerType].model;
          // Use real usage data if available, otherwise estimate from char count
          const hasRealUsage = streamUsage && (streamUsage.inputTokens > 0 || streamUsage.outputTokens > 0);
          const inputTokens = hasRealUsage ? streamUsage!.inputTokens : Math.ceil(dreamText.length / 4);
          const outputTokens = hasRealUsage ? streamUsage!.outputTokens : Math.ceil(outputCharCount / 4);
          const estimatedCost = calculateCostFromModelName(modelName, inputTokens, outputTokens);

          logLlmCost({
            provider: providerType,
            model: modelName,
            inputTokens,
            outputTokens,
            estimatedCost,
            latencyMs,
            endpoint: 'interpret',
            success: true,
            metadata: {
              streaming: true,
              outputCharCount,
              tokensEstimated: !hasRealUsage,
            },
          });
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
    console.error('[Dream Interpret API] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to interpret dream';

    // Log error
    const latencyMs = Date.now() - startTime;
    logLlmCost({
      provider: 'gemini',
      model: PROVIDER_CONFIG.gemini.model,
      inputTokens: 0,
      outputTokens: 0,
      estimatedCost: 0,
      latencyMs,
      endpoint: 'interpret',
      success: false,
      errorType: 'request_error',
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
