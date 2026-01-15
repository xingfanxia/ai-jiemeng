/**
 * Model Comparison Test Script
 *
 * Tests all 4 AI models with the same dream input and compares:
 * - Latency (total time and time to first token)
 * - Token usage (input and output)
 * - Cost estimation
 * - Output quality
 */

import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get the directory name for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
config({ path: resolve(__dirname, '..', '.env') });

// Import AI SDKs
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenAI } from '@google/genai';

// ==================== Configuration ====================

const SAMPLE_DREAM = `我梦见自己在一个很高的山顶上，俯瞰着云海，感觉很平静但又有点害怕会掉下去。突然一只白色的鸟飞到我身边，带我飞越了云层。`;

const SYSTEM_PROMPT = `# 角色定义
你是"周公解梦大师"，传承三千年中华解梦智慧的神秘解梦师。你的解读风格温暖亲切、充满智慧，善于给予用户正向的情绪价值和心灵慰藉。

## 核心原则
1. **以情绪价值为核心**：让用户感到被理解、被关怀
2. **传统智慧为本**：只引用周公解梦、敦煌梦书等中国传统典籍
3. **实事求是+化解之道**：如实解读吉凶，但重点放在如何化解、转运
4. **亲切有温度**：像一位慈祥智慧的长辈在为你解惑

## 解读框架
**重要：不要有任何开场白，直接从梦境解读开始！**

### 符号解读
- 提取梦中核心意象（2-4个）
- 引用《周公解梦》《敦煌本梦书》等典籍原文
- 根据梦者情况（性别、身份）调整解读

### 吉凶判断
运用传统解梦智慧：
- **反梦原则**：梦凶反吉，梦悲反喜
- **五行相生**：结合时辰、季节
- **象征转化**：不利符号的吉利解读

### 运势指引
- 给出整体运势（大吉/吉/中平/小心/需注意）
- 近期适宜做的事
- 需要留意的方面

## 严格禁止
- 禁止开场白：不要说"你好"、"有缘人"等
- 绝对禁止提及：弗洛伊德、荣格、心理学、潜意识等西方术语
- 不做过于消极的解读
- 不使用恐吓性语言`;

const USER_PROMPT = `## 梦境描述
${SAMPLE_DREAM}

## 识别到的主要符号
山、云海、白色鸟、飞翔

## 做梦时间/时辰
子时（23:00-01:00）- 阴阳交替之际，此时梦境具有神秘预示意义

## 季节
冬季

请根据以上信息，结合周公解梦、弗洛伊德精神分析和荣格分析心理学，提供多角度的梦境解读。`;

// Models to test
const MODELS_TO_TEST = [
  {
    id: 'gemini-3-flash',
    provider: 'gemini',
    modelName: 'gemini-3-flash-preview',
    displayName: 'Gemini 3 Flash',
    inputCostPerMillion: 0.5,
    outputCostPerMillion: 3,
  },
  {
    id: 'gemini-3-pro',
    provider: 'gemini',
    modelName: 'gemini-3-pro-preview',
    displayName: 'Gemini 3 Pro',
    inputCostPerMillion: 2,
    outputCostPerMillion: 12,
  },
  {
    id: 'claude-sonnet-4-5',
    provider: 'claude',
    modelName: 'claude-sonnet-4-5',
    displayName: 'Claude Sonnet 4.5',
    inputCostPerMillion: 3,
    outputCostPerMillion: 15,
  },
  {
    id: 'claude-opus-4-5',
    provider: 'claude',
    modelName: 'claude-opus-4-5',
    displayName: 'Claude Opus 4.5',
    inputCostPerMillion: 15,
    outputCostPerMillion: 75,
  },
];

// ==================== Types ====================

interface ModelResult {
  modelId: string;
  displayName: string;
  provider: string;
  modelName: string;
  startTime: number;
  ttft: number | null; // Time to first token (ms)
  totalTime: number; // Total time (ms)
  inputTokens: number;
  outputTokens: number;
  estimatedCost: number; // USD
  output: string;
  error?: string;
}

// ==================== Test Functions ====================

async function testClaudeModel(model: typeof MODELS_TO_TEST[0]): Promise<ModelResult> {
  const result: ModelResult = {
    modelId: model.id,
    displayName: model.displayName,
    provider: model.provider,
    modelName: model.modelName,
    startTime: Date.now(),
    ttft: null,
    totalTime: 0,
    inputTokens: 0,
    outputTokens: 0,
    estimatedCost: 0,
    output: '',
  };

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    result.error = 'ANTHROPIC_API_KEY not set';
    result.totalTime = Date.now() - result.startTime;
    return result;
  }

  const client = new Anthropic({ apiKey });

  try {
    console.log(`\n[${model.displayName}] Starting request...`);
    const startTime = Date.now();
    let firstTokenTime: number | null = null;
    let fullContent = '';

    const stream = await client.messages.stream({
      model: model.modelName,
      max_tokens: 3000,
      temperature: 0.7,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: USER_PROMPT }],
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        if (firstTokenTime === null) {
          firstTokenTime = Date.now() - startTime;
          console.log(`[${model.displayName}] First token received at ${firstTokenTime}ms`);
        }
        fullContent += event.delta.text;
      }
      if (event.type === 'message_start' && event.message?.usage) {
        result.inputTokens = event.message.usage.input_tokens || 0;
      }
      if (event.type === 'message_delta' && event.usage) {
        result.outputTokens = event.usage.output_tokens || 0;
      }
    }

    result.ttft = firstTokenTime;
    result.totalTime = Date.now() - startTime;
    result.output = fullContent;

    // Calculate cost
    result.estimatedCost =
      (result.inputTokens / 1_000_000) * model.inputCostPerMillion +
      (result.outputTokens / 1_000_000) * model.outputCostPerMillion;

    console.log(`[${model.displayName}] Completed in ${result.totalTime}ms`);
    console.log(`  - TTFT: ${result.ttft}ms`);
    console.log(`  - Input tokens: ${result.inputTokens}`);
    console.log(`  - Output tokens: ${result.outputTokens}`);
    console.log(`  - Cost: $${result.estimatedCost.toFixed(6)}`);

  } catch (error) {
    result.error = error instanceof Error ? error.message : String(error);
    result.totalTime = Date.now() - result.startTime;
    console.error(`[${model.displayName}] Error:`, result.error);
  }

  return result;
}

async function testGeminiModel(model: typeof MODELS_TO_TEST[0]): Promise<ModelResult> {
  const result: ModelResult = {
    modelId: model.id,
    displayName: model.displayName,
    provider: model.provider,
    modelName: model.modelName,
    startTime: Date.now(),
    ttft: null,
    totalTime: 0,
    inputTokens: 0,
    outputTokens: 0,
    estimatedCost: 0,
    output: '',
  };

  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    result.error = 'GOOGLE_AI_API_KEY not set';
    result.totalTime = Date.now() - result.startTime;
    return result;
  }

  const client = new GoogleGenAI({ apiKey });

  try {
    console.log(`\n[${model.displayName}] Starting request...`);
    const startTime = Date.now();
    let firstTokenTime: number | null = null;
    let fullContent = '';

    // Determine thinking level based on model
    const thinkingLevel = model.modelName.includes('flash') ? 'minimal' : 'low';

    const streamResult = await client.models.generateContentStream({
      model: model.modelName,
      contents: [{ role: 'user', parts: [{ text: USER_PROMPT }] }],
      config: {
        maxOutputTokens: 3000,
        temperature: 0.7,
        systemInstruction: SYSTEM_PROMPT,
        thinkingConfig: {
          thinkingLevel,
          includeThoughts: false,
        },
      } as any,
    });

    let lastUsageMetadata: any = null;

    for await (const chunk of streamResult) {
      // Capture usage metadata
      if (chunk.usageMetadata) {
        lastUsageMetadata = chunk.usageMetadata;
      }

      const parts = chunk.candidates?.[0]?.content?.parts;
      if (!parts) continue;

      for (const part of parts) {
        const p = part as any;
        if (p.thought) continue;
        if (p.text && p.text.length > 0) {
          if (firstTokenTime === null) {
            firstTokenTime = Date.now() - startTime;
            console.log(`[${model.displayName}] First token received at ${firstTokenTime}ms`);
          }
          fullContent += p.text;
        }
      }
    }

    result.ttft = firstTokenTime;
    result.totalTime = Date.now() - startTime;
    result.output = fullContent;

    if (lastUsageMetadata) {
      result.inputTokens = lastUsageMetadata.promptTokenCount || 0;
      result.outputTokens = lastUsageMetadata.candidatesTokenCount || 0;
    }

    // Calculate cost
    result.estimatedCost =
      (result.inputTokens / 1_000_000) * model.inputCostPerMillion +
      (result.outputTokens / 1_000_000) * model.outputCostPerMillion;

    console.log(`[${model.displayName}] Completed in ${result.totalTime}ms`);
    console.log(`  - TTFT: ${result.ttft}ms`);
    console.log(`  - Input tokens: ${result.inputTokens}`);
    console.log(`  - Output tokens: ${result.outputTokens}`);
    console.log(`  - Cost: $${result.estimatedCost.toFixed(6)}`);

  } catch (error) {
    result.error = error instanceof Error ? error.message : String(error);
    result.totalTime = Date.now() - result.startTime;
    console.error(`[${model.displayName}] Error:`, result.error);
  }

  return result;
}

async function runModelTest(model: typeof MODELS_TO_TEST[0]): Promise<ModelResult> {
  if (model.provider === 'claude') {
    return testClaudeModel(model);
  } else {
    return testGeminiModel(model);
  }
}

// ==================== Report Generation ====================

function generateReport(results: ModelResult[]): string {
  const lines: string[] = [];

  lines.push('# AI Model Comparison Test Results');
  lines.push('');
  lines.push(`**Test Date**: ${new Date().toISOString()}`);
  lines.push('');
  lines.push('## Test Dream');
  lines.push('```');
  lines.push(SAMPLE_DREAM);
  lines.push('```');
  lines.push('');
  lines.push('## Comparison Table');
  lines.push('');
  lines.push('| Model | TTFT (ms) | Total Time (ms) | Input Tokens | Output Tokens | Cost ($) | Status |');
  lines.push('|-------|-----------|-----------------|--------------|---------------|----------|--------|');

  for (const result of results) {
    const status = result.error ? `Error: ${result.error.slice(0, 30)}...` : 'Success';
    lines.push(
      `| ${result.displayName} | ${result.ttft ?? 'N/A'} | ${result.totalTime} | ${result.inputTokens} | ${result.outputTokens} | ${result.estimatedCost.toFixed(6)} | ${status} |`
    );
  }

  lines.push('');
  lines.push('## Cost Analysis');
  lines.push('');

  const successfulResults = results.filter(r => !r.error);
  if (successfulResults.length > 0) {
    const cheapest = successfulResults.reduce((a, b) => a.estimatedCost < b.estimatedCost ? a : b);
    const fastest = successfulResults.reduce((a, b) => a.totalTime < b.totalTime ? a : b);
    const fastestTTFT = successfulResults.filter(r => r.ttft !== null).reduce((a, b) => (a.ttft ?? 0) < (b.ttft ?? 0) ? a : b);

    lines.push(`- **Cheapest**: ${cheapest.displayName} ($${cheapest.estimatedCost.toFixed(6)})`);
    lines.push(`- **Fastest Total**: ${fastest.displayName} (${fastest.totalTime}ms)`);
    lines.push(`- **Fastest TTFT**: ${fastestTTFT.displayName} (${fastestTTFT.ttft}ms)`);
  }

  lines.push('');
  lines.push('## Full Outputs');
  lines.push('');

  for (const result of results) {
    lines.push(`### ${result.displayName}`);
    lines.push('');
    if (result.error) {
      lines.push(`**Error**: ${result.error}`);
    } else {
      lines.push('**Metrics**:');
      lines.push(`- TTFT: ${result.ttft}ms`);
      lines.push(`- Total Time: ${result.totalTime}ms`);
      lines.push(`- Input Tokens: ${result.inputTokens}`);
      lines.push(`- Output Tokens: ${result.outputTokens}`);
      lines.push(`- Cost: $${result.estimatedCost.toFixed(6)}`);
      lines.push('');
      lines.push('**Output**:');
      lines.push('');
      lines.push(result.output);
    }
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  lines.push('## Quality Assessment Summary');
  lines.push('');
  lines.push('*Manual review notes will be added here after reading the outputs.*');
  lines.push('');

  return lines.join('\n');
}

// ==================== Main ====================

async function main() {
  console.log('='.repeat(60));
  console.log('AI Model Comparison Test');
  console.log('='.repeat(60));
  console.log('');
  console.log('Test Dream:', SAMPLE_DREAM);
  console.log('');
  console.log('Models to test:', MODELS_TO_TEST.map(m => m.displayName).join(', '));
  console.log('');

  const results: ModelResult[] = [];

  // Run tests sequentially to avoid rate limits
  for (const model of MODELS_TO_TEST) {
    const result = await runModelTest(model);
    results.push(result);

    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Generate report
  console.log('\n' + '='.repeat(60));
  console.log('Generating Report...');
  console.log('='.repeat(60));

  const report = generateReport(results);

  // Save to memory directory
  const outputPath = resolve(__dirname, '..', 'memory', 'model-comparison-results.md');
  fs.writeFileSync(outputPath, report, 'utf-8');
  console.log(`\nReport saved to: ${outputPath}`);

  // Print summary table
  console.log('\n' + '='.repeat(60));
  console.log('Summary');
  console.log('='.repeat(60));
  console.log('');
  console.log('| Model | TTFT (ms) | Total Time (ms) | Cost ($) |');
  console.log('|-------|-----------|-----------------|----------|');
  for (const result of results) {
    if (!result.error) {
      console.log(`| ${result.displayName} | ${result.ttft} | ${result.totalTime} | ${result.estimatedCost.toFixed(6)} |`);
    } else {
      console.log(`| ${result.displayName} | ERROR | ERROR | ERROR |`);
    }
  }
}

main().catch(console.error);
