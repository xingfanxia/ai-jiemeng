/**
 * AI Provider Abstraction Layer
 *
 * Provides unified interface for multiple AI providers (Claude, Gemini)
 * with A/B testing, metrics tracking, and fallback support.
 */

// Types
export * from './types';

// Config
export {
  getABTestConfig,
  selectProvider,
  PROVIDER_CONFIG,
  COST_PER_MILLION_TOKENS,
  MODEL_CONFIG,
  getModelId,
} from './config';

// Metrics
export {
  calculateCost,
  calculateCostFromModelName,
  logMetrics,
  createMetrics,
  finalizeMetrics,
  formatBenchmarkReport,
  type BenchmarkResult,
} from './metrics';

// Providers
export { getProvider, getAvailableProviders } from './providers';

// Prompts
export { getSystemPrompt, adaptPromptForProvider } from './prompts';

// Cost logging
export { logLlmCost, type LogCostParams, type LlmCostEndpoint } from './cost-logger';

// Dream Interpretation
export {
  streamDreamInterpretation,
  getDreamInterpretation,
  extractSymbols,
  buildInterpretationContext,
  selectInterpretationProvider,
  type InterpretationRequest,
  type ExtractedSymbol,
  type InterpretationContext,
} from './interpret';
