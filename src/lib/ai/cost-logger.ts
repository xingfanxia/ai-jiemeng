import { createAdminClient } from '@/lib/supabase/server';
import type { AIProviderType } from './types';

export type LlmCostEndpoint = 'interpret' | 'interpret-stream' | 'chat' | 'guidance';

export interface LogCostParams {
  provider: AIProviderType;
  model: string;
  inputTokens: number;
  outputTokens: number;
  estimatedCost: number;
  latencyMs: number;
  endpoint: LlmCostEndpoint;
  success: boolean;
  errorType?: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Log LLM API cost to database for analytics.
 * Non-blocking - errors are logged but don't fail the request.
 */
export async function logLlmCost(params: LogCostParams): Promise<void> {
  try {
    const supabase = createAdminClient();

    const record = {
      provider: params.provider,
      model: params.model,
      input_tokens: params.inputTokens,
      output_tokens: params.outputTokens,
      estimated_cost: params.estimatedCost,
      latency_ms: params.latencyMs,
      app: 'dream' as const,
      endpoint: params.endpoint,
      success: params.success,
      error_type: params.errorType || null,
      user_id: params.userId || null,
      metadata: params.metadata || null,
    };

    const { error } = await (supabase.from('llm_costs') as any).insert(record);

    if (error) {
      console.error('[LLM Cost Logger] Failed to log cost:', error);
    }
  } catch (error) {
    // Non-blocking - don't fail the request if logging fails
    console.error('[LLM Cost Logger] Error:', error);
  }
}
