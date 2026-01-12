/**
 * Dream Interpretation AI Logic
 *
 * Main interpretation logic that:
 * - Extracts symbols from dream text
 * - Looks up symbols in knowledge base
 * - Builds context with conditions (时辰, etc.)
 * - Calls AI with streaming response
 */

import type { AIMessage, AIRequestOptions, AIStreamChunk, AIProviderType } from './types';
import { getProvider } from './providers';
import { getABTestConfig, selectProvider } from './config';
import {
  MULTI_PERSPECTIVE_SYSTEM_PROMPT,
  GUIDANCE_SYSTEM_PROMPT,
  generateDreamInterpretationPrompt,
  detectSensitiveContent,
  SENSITIVE_TOPICS,
  type DreamInputData,
  type InterpretationPromptOptions,
  searchSymbols,
  getSymbolByName,
  getCurrentTimeOfDay,
  getCurrentSeason,
  getDreamTimeContext,
  TIME_OF_DAY_OPTIONS,
  type TimeOfDay,
} from '../knowledge';

// ==================== Type Definitions ====================

/**
 * API Input for dream interpretation
 */
export interface InterpretationRequest {
  /** Dream description */
  content: string;
  /** Date of the dream (ISO string) */
  dreamDate?: string;
  /** Hour of dream in traditional Chinese time (子时, 丑时, etc.) */
  dreamTime?: string;
  /** User's moods (can be multiple) */
  moods?: string[];
  /** Additional context */
  context?: {
    isPregnant?: boolean;
    occupation?: string;
    gender?: 'male' | 'female';
  };
}

/**
 * Extracted symbol information
 */
export interface ExtractedSymbol {
  name: string;
  category?: string;
  knowledgeBaseMatch?: boolean;
  interpretation?: string;
}

/**
 * Interpretation context built from request
 */
export interface InterpretationContext {
  dreamDescription: string;
  extractedSymbols: ExtractedSymbol[];
  timeContext: string;
  seasonContext: string;
  dreamerContext: string;
  sensitiveTopics: string[];
  knowledgeBaseContext: string;
}

// ==================== Symbol Extraction ====================

/**
 * Common dream symbol keywords for extraction
 */
const SYMBOL_KEYWORDS = [
  // Animals
  '蛇', '龙', '虎', '鱼', '鸟', '狗', '猫', '马', '牛', '羊', '猪', '鸡', '老鼠', '兔子', '蝴蝶', '蜘蛛', '蚂蚁', '蜜蜂',
  // Nature
  '水', '火', '山', '树', '花', '草', '云', '雨', '雪', '风', '太阳', '月亮', '星星', '河', '海', '湖',
  // People
  '父亲', '母亲', '爸爸', '妈妈', '孩子', '婴儿', '老人', '朋友', '陌生人', '老师', '医生',
  // Objects
  '房子', '车', '钱', '金', '银', '刀', '剑', '书', '衣服', '鞋', '戒指', '手机', '电脑',
  // Actions
  '飞', '跑', '追', '逃', '掉', '落', '死', '哭', '笑', '吃', '喝', '游泳', '爬',
  // Places
  '学校', '医院', '家', '公司', '商店', '寺庙', '教堂', '墓地',
  // Body
  '牙', '头发', '眼睛', '手', '脚', '血',
];

/**
 * Extract symbols from dream text
 */
export function extractSymbols(dreamText: string): ExtractedSymbol[] {
  const extractedSymbols: ExtractedSymbol[] = [];
  const seenSymbols = new Set<string>();

  // First, try to match against our knowledge base
  const kbMatches = searchSymbols(dreamText).slice(0, 10);
  for (const symbol of kbMatches) {
    if (!seenSymbols.has(symbol.name)) {
      seenSymbols.add(symbol.name);
      const primaryInterpretation = symbol.interpretations[0];
      extractedSymbols.push({
        name: symbol.name,
        category: symbol.category.primary,
        knowledgeBaseMatch: true,
        interpretation: primaryInterpretation?.content,
      });
    }
  }

  // Then, scan for common keywords not yet found
  for (const keyword of SYMBOL_KEYWORDS) {
    if (dreamText.includes(keyword) && !seenSymbols.has(keyword)) {
      seenSymbols.add(keyword);
      // Check if this keyword exists in KB
      const kbSymbol = getSymbolByName(keyword);
      extractedSymbols.push({
        name: keyword,
        knowledgeBaseMatch: !!kbSymbol,
        category: kbSymbol?.category.primary,
        interpretation: kbSymbol?.interpretations[0]?.content,
      });
    }
  }

  return extractedSymbols;
}

// ==================== Time Context ====================

/**
 * Convert Chinese time name to TimeOfDay
 */
function parseChineseTime(timeStr: string): TimeOfDay | undefined {
  const timeMap: Record<string, TimeOfDay> = {
    '子时': 'zi',
    '丑时': 'chou',
    '寅时': 'yin',
    '卯时': 'mao',
    '辰时': 'chen',
    '巳时': 'si',
    '午时': 'wu',
    '未时': 'wei',
    '申时': 'shen',
    '酉时': 'you',
    '戌时': 'xu',
    '亥时': 'hai',
  };
  return timeMap[timeStr];
}

/**
 * Get time context string
 */
function getTimeContextString(dreamTime?: string): string {
  let timeOfDay: TimeOfDay;

  if (dreamTime) {
    const parsed = parseChineseTime(dreamTime);
    timeOfDay = parsed || getCurrentTimeOfDay();
  } else {
    timeOfDay = getCurrentTimeOfDay();
  }

  const season = getCurrentSeason();
  return getDreamTimeContext(timeOfDay, season);
}

// ==================== Context Building ====================

/**
 * Build interpretation context from request
 */
export function buildInterpretationContext(request: InterpretationRequest): InterpretationContext {
  // Extract symbols
  const extractedSymbols = extractSymbols(request.content);

  // Build time context
  const timeContext = getTimeContextString(request.dreamTime);

  // Get season name
  const season = getCurrentSeason();
  const seasonNames: Record<string, string> = {
    spring: '春季',
    summer: '夏季',
    autumn: '秋季',
    winter: '冬季',
  };
  const seasonContext = seasonNames[season] || '当前季节';

  // Build dreamer context
  const dreamerParts: string[] = [];
  if (request.context?.gender) {
    dreamerParts.push(request.context.gender === 'male' ? '男性' : '女性');
  }
  if (request.context?.occupation) {
    dreamerParts.push(`职业：${request.context.occupation}`);
  }
  if (request.context?.isPregnant) {
    dreamerParts.push('孕妇');
  }
  if (request.moods && request.moods.length > 0) {
    dreamerParts.push(`心情：${request.moods.join('、')}`);
  }
  const dreamerContext = dreamerParts.length > 0 ? dreamerParts.join('，') : '未提供';

  // Check for sensitive content
  const sensitiveCheck = detectSensitiveContent(request.content);
  const sensitiveTopics = sensitiveCheck.topics;

  // Build knowledge base context
  const kbContextParts: string[] = [];
  for (const symbol of extractedSymbols) {
    if (symbol.knowledgeBaseMatch && symbol.interpretation) {
      kbContextParts.push(`【${symbol.name}】${symbol.interpretation}`);
    }
  }
  const knowledgeBaseContext = kbContextParts.length > 0
    ? `\n\n## 知识库参考\n${kbContextParts.join('\n')}`
    : '';

  return {
    dreamDescription: request.content,
    extractedSymbols,
    timeContext,
    seasonContext,
    dreamerContext,
    sensitiveTopics,
    knowledgeBaseContext,
  };
}

// ==================== Prompt Building ====================

/**
 * Build the user prompt for interpretation
 */
export function buildUserPrompt(context: InterpretationContext): string {
  const parts: string[] = [];

  // Dream description
  parts.push('## 梦境描述');
  parts.push(context.dreamDescription);

  // Extracted symbols
  if (context.extractedSymbols.length > 0) {
    parts.push('\n## 识别到的主要符号');
    parts.push(context.extractedSymbols.map(s => s.name).join('、'));
  }

  // Time context
  parts.push('\n## 做梦时间/时辰');
  parts.push(context.timeContext);

  // Season
  parts.push('\n## 季节');
  parts.push(context.seasonContext);

  // Dreamer context
  if (context.dreamerContext !== '未提供') {
    parts.push('\n## 梦者信息');
    parts.push(context.dreamerContext);
  }

  // Knowledge base context (if available)
  if (context.knowledgeBaseContext) {
    parts.push(context.knowledgeBaseContext);
  }

  // Sensitive content handling
  if (context.sensitiveTopics.length > 0) {
    parts.push('\n## 特别说明');
    parts.push('此梦境涉及敏感话题，请采用专业、温和的语言进行解读。');
  }

  parts.push('\n请根据以上信息，结合周公解梦、弗洛伊德精神分析和荣格分析心理学，提供多角度的梦境解读。');

  return parts.join('\n');
}

// ==================== A/B Testing Provider Selection ====================

/**
 * Select AI provider with A/B testing (70% Gemini, 30% Claude)
 */
export function selectInterpretationProvider(): { provider: AIProviderType; providerName: string } {
  // Get A/B test config
  const config = getABTestConfig();

  // Override with 70% Gemini, 30% Claude for dream interpretation
  const dreamConfig = {
    ...config,
    enabled: true,
    trafficSplit: {
      claude: 30,
      gemini: 70,
    },
  };

  const selectedType = selectProvider(dreamConfig);
  const providerNames: Record<AIProviderType, string> = {
    gemini: 'Gemini 3 Pro',
    claude: 'Claude Opus 4.5',
  };

  return {
    provider: selectedType,
    providerName: providerNames[selectedType],
  };
}

// ==================== Streaming Interpretation ====================

/**
 * Stream dream interpretation from AI
 */
export async function* streamDreamInterpretation(
  request: InterpretationRequest
): AsyncGenerator<{ content: string; done: boolean; provider?: string; usage?: { inputTokens: number; outputTokens: number } }, void, unknown> {
  // Build context
  const context = buildInterpretationContext(request);

  // Build messages
  const userPrompt = buildUserPrompt(context);
  const messages: AIMessage[] = [
    { role: 'user', content: userPrompt },
  ];

  // Select provider with A/B testing
  const { provider: providerType, providerName } = selectInterpretationProvider();

  console.log(`[Dream Interpretation] Using provider: ${providerName}`);

  // Get the provider instance
  const provider = getProvider(providerType);

  // Check if streaming is available
  if (!provider.chatStream) {
    throw new Error(`Provider ${providerType} does not support streaming`);
  }

  // Request options
  const options: AIRequestOptions = {
    systemPrompt: MULTI_PERSPECTIVE_SYSTEM_PROMPT,
    maxTokens: 3000,
    temperature: 0.7,
  };

  // Yield provider info first
  yield { content: '', done: false, provider: providerName };

  // Stream the response
  const stream = provider.chatStream(messages, options);

  for await (const chunk of stream) {
    yield {
      content: chunk.content,
      done: chunk.done,
      usage: chunk.usage,
    };
  }
}

// ==================== Non-Streaming Interpretation ====================

/**
 * Get dream interpretation without streaming (for testing or fallback)
 */
export async function getDreamInterpretation(
  request: InterpretationRequest
): Promise<{ content: string; provider: string; usage?: { inputTokens: number; outputTokens: number } }> {
  // Build context
  const context = buildInterpretationContext(request);

  // Build messages
  const userPrompt = buildUserPrompt(context);
  const messages: AIMessage[] = [
    { role: 'user', content: userPrompt },
  ];

  // Select provider with A/B testing
  const { provider: providerType, providerName } = selectInterpretationProvider();

  console.log(`[Dream Interpretation] Using provider: ${providerName}`);

  // Get the provider instance
  const provider = getProvider(providerType);

  // Request options
  const options: AIRequestOptions = {
    systemPrompt: MULTI_PERSPECTIVE_SYSTEM_PROMPT,
    maxTokens: 3000,
    temperature: 0.7,
  };

  const response = await provider.chat(messages, options);

  return {
    content: response.content,
    provider: providerName,
    usage: response.usage,
  };
}

// ==================== Guidance Generation ====================

/**
 * Request for guidance generation
 */
export interface GuidanceRequest {
  /** Original dream content */
  dreamContent: string;
  /** The interpretation that was generated */
  interpretation: string;
  /** Dream ID (for reference) */
  dreamId?: string;
}

/**
 * Build user prompt for guidance generation
 */
export function buildGuidancePrompt(request: GuidanceRequest): string {
  return `## 原始梦境
${request.dreamContent}

## 已有的解读
${request.interpretation}

请基于以上梦境解读，为用户提供个人化的指引和建议。`;
}

/**
 * Stream guidance generation from AI
 */
export async function* streamGuidance(
  request: GuidanceRequest
): AsyncGenerator<{ content: string; done: boolean; provider?: string; usage?: { inputTokens: number; outputTokens: number } }, void, unknown> {
  // Build messages
  const userPrompt = buildGuidancePrompt(request);
  const messages: AIMessage[] = [
    { role: 'user', content: userPrompt },
  ];

  // Select provider with A/B testing
  const { provider: providerType, providerName } = selectInterpretationProvider();

  console.log(`[Dream Guidance] Using provider: ${providerName}`);

  // Get the provider instance
  const provider = getProvider(providerType);

  // Check if streaming is available
  if (!provider.chatStream) {
    throw new Error(`Provider ${providerType} does not support streaming`);
  }

  // Request options
  const options: AIRequestOptions = {
    systemPrompt: GUIDANCE_SYSTEM_PROMPT,
    maxTokens: 1500,
    temperature: 0.7,
  };

  // Yield provider info first
  yield { content: '', done: false, provider: providerName };

  // Stream the response
  const stream = provider.chatStream(messages, options);

  for await (const chunk of stream) {
    yield {
      content: chunk.content,
      done: chunk.done,
      usage: chunk.usage,
    };
  }
}
