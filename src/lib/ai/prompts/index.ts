/**
 * Provider-specific Prompt Registry
 *
 * Some prompts may need slight adjustments for different providers.
 * Gemini may need more explicit JSON formatting instructions.
 */

import type { AIProviderType } from '../types';

export interface PromptConfig {
  systemPrompt: string;
  userPromptTemplate?: string;
  jsonMode?: boolean;
}

// Gemini-specific JSON output instruction suffix
const GEMINI_JSON_SUFFIX = `

IMPORTANT: Your response MUST be valid JSON only. Do not include any markdown code blocks, explanations, or text outside the JSON structure.`;

export function getSystemPrompt(
  basePrompt: string,
  provider: AIProviderType,
  jsonMode: boolean = false
): string {
  if (provider === 'gemini' && jsonMode) {
    return basePrompt + GEMINI_JSON_SUFFIX;
  }
  return basePrompt;
}

// Export existing prompts with provider adaptation
export function adaptPromptForProvider(
  prompt: string,
  provider: AIProviderType,
  options?: { jsonMode?: boolean }
): string {
  if (provider === 'gemini' && options?.jsonMode) {
    return prompt + GEMINI_JSON_SUFFIX;
  }
  return prompt;
}
