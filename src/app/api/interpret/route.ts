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
 *   mood?: string;            // User's mood
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

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Accept both 'content' and 'dreamContent' field names
    const { content, dreamContent, dreamDate, dreamTime, mood, context } = body;
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
      mood,
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
        try {
          let provider: string | undefined;

          for await (const chunk of streamDreamInterpretation(interpretRequest)) {
            // Capture provider name from first chunk
            if (chunk.provider && !provider) {
              provider = chunk.provider;
              // Send provider info as first SSE event
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
          console.error('[Dream Interpret API] Stream error:', error);
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
    console.error('[Dream Interpret API] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to interpret dream';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
