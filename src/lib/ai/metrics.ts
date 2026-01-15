/**
 * AI Request Metrics Tracking
 */

import type { AIModelId, AIProviderType, RequestMetrics } from './types';
import { COST_PER_MILLION_TOKENS, getModelId } from './config';

export interface BenchmarkResult {
  modelId: AIModelId;
  modelName: string;
  latencyMs: number;
  timeToFirstToken?: number;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  estimatedCost: number;
  success: boolean;
  error?: string;
  response?: string;
  timestamp: Date;
}

export function calculateCost(
  modelId: AIModelId,
  inputTokens: number,
  outputTokens: number
): number {
  const costs = COST_PER_MILLION_TOKENS[modelId];
  const inputCost = (inputTokens / 1_000_000) * costs.input;
  const outputCost = (outputTokens / 1_000_000) * costs.output;
  return inputCost + outputCost;
}

export function calculateCostFromModelName(
  modelName: string,
  inputTokens: number,
  outputTokens: number
): number {
  const modelId = getModelId(modelName);
  return calculateCost(modelId, inputTokens, outputTokens);
}

export function formatBenchmarkReport(results: BenchmarkResult[]): string {
  const lines: string[] = [
    '# AI Model Benchmark Report',
    `Generated: ${new Date().toISOString()}`,
    '',
    '## Summary',
    '',
    '| Model | Latency | TTFT | Input Tok | Output Tok | Cost | Status |',
    '|-------|---------|------|-----------|------------|------|--------|',
  ];

  for (const r of results) {
    const ttft = r.timeToFirstToken ? `${r.timeToFirstToken}ms` : 'N/A';
    const cost = `$${r.estimatedCost.toFixed(4)}`;
    const status = r.success ? 'OK' : `Failed: ${r.error || 'Unknown'}`;
    lines.push(
      `| ${r.modelId} | ${r.latencyMs}ms | ${ttft} | ${r.inputTokens} | ${r.outputTokens} | ${cost} | ${status} |`
    );
  }

  // Add cost comparison
  const successResults = results.filter(r => r.success);
  if (successResults.length > 1) {
    lines.push('', '## Cost Comparison', '');
    const baseline = successResults[0];
    for (const r of successResults) {
      const ratio = r.estimatedCost / baseline.estimatedCost;
      lines.push(`- **${r.modelId}**: $${r.estimatedCost.toFixed(4)} (${ratio.toFixed(2)}x vs ${baseline.modelId})`);
    }
  }

  // Add latency comparison
  if (successResults.length > 1) {
    lines.push('', '## Latency Comparison', '');
    const baseline = successResults[0];
    for (const r of successResults) {
      const ratio = r.latencyMs / baseline.latencyMs;
      lines.push(`- **${r.modelId}**: ${r.latencyMs}ms (${ratio.toFixed(2)}x vs ${baseline.modelId})`);
    }
  }

  return lines.join('\n');
}

// Legacy function for backwards compatibility
export function logMetrics(metrics: {
  provider: string;
  operation: string;
  latencyMs: number;
  inputTokens: number;
  outputTokens: number;
  estimatedCost: number;
  success: boolean;
  error?: string;
}): void {
  const costStr = metrics.estimatedCost > 0
    ? `$${metrics.estimatedCost.toFixed(4)}`
    : 'N/A';

  const tokenStr = metrics.inputTokens > 0 || metrics.outputTokens > 0
    ? `${metrics.inputTokens}+${metrics.outputTokens}`
    : 'N/A';

  const status = metrics.success ? 'OK' : 'ERR';

  console.log(
    `[AI ${status}] ${metrics.provider}/${metrics.operation}`,
    `{ latency: ${metrics.latencyMs}ms, tokens: ${tokenStr}, cost: ${costStr} }`,
    metrics.error ? `error: ${metrics.error}` : ''
  );
}

// Legacy helper functions for client compatibility
export interface LegacyMetricsBase {
  provider: AIProviderType;
  operation: string;
  latencyMs: number;
  timestamp: Date;
}

export function createMetrics(
  provider: AIProviderType,
  operation: string,
  startTime: number
): LegacyMetricsBase {
  return {
    provider,
    operation,
    latencyMs: Date.now() - startTime,
    timestamp: new Date(),
  };
}

export function finalizeMetrics(
  base: LegacyMetricsBase,
  inputTokens: number,
  outputTokens: number,
  success: boolean,
  error?: string
): RequestMetrics {
  // Use a default model for legacy cost calculation
  const modelId: AIModelId = base.provider === 'claude' ? 'claude-opus-4-5' : 'gemini-3-pro';
  const costs = COST_PER_MILLION_TOKENS[modelId];
  const estimatedCost = (inputTokens / 1_000_000) * costs.input + (outputTokens / 1_000_000) * costs.output;

  return {
    ...base,
    inputTokens,
    outputTokens,
    estimatedCost,
    success,
    error,
  };
}
