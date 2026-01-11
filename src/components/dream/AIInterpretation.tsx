'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Sparkles, RefreshCw, Share2, Loader2, BookOpen, Brain, Compass } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useTypewriter } from '@/hooks/useTypewriter';
import { SymbolCard } from './SymbolCard';
import { FortuneIndicator } from './FortuneIndicator';
import type { DreamSymbol, DreamInterpretation, DreamMood } from '@/lib/types/dream';
import type { FortuneType } from '@/lib/knowledge/fortune';

/**
 * Section configuration for interpretation tabs
 */
const SECTIONS = {
  zhougong: {
    id: 'zhougong',
    label: '周公解梦',
    icon: BookOpen,
    description: '传统解梦智慧',
    color: 'text-amber-600 dark:text-amber-400',
  },
  psychology: {
    id: 'psychology',
    label: '心理分析',
    icon: Brain,
    description: '潜意识解读',
    color: 'text-blue-600 dark:text-blue-400',
  },
  guidance: {
    id: 'guidance',
    label: '运势指引',
    icon: Compass,
    description: '未来指引',
    color: 'text-green-600 dark:text-green-400',
  },
} as const;

type SectionId = keyof typeof SECTIONS;

interface AIInterpretationProps {
  /** The dream content being interpreted */
  dreamContent: string;
  /** Optional mood for context */
  mood?: DreamMood;
  /** Optional context (gender, pregnancy status, etc.) */
  context?: {
    gender?: 'male' | 'female' | 'other';
    isPregnant?: boolean;
    dreamTime?: string;
  };
  /** Whether to auto-start interpretation */
  autoStart?: boolean;
  /** Called when interpretation completes */
  onComplete?: (interpretation: DreamInterpretation, symbols: DreamSymbol[]) => void;
  /** Show in container card */
  showContainer?: boolean;
}

/**
 * Markdown-like text renderer for interpretation content
 */
function MarkdownText({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  lines.forEach((line, idx) => {
    const trimmedLine = line.trim();

    // Horizontal rule
    if (trimmedLine === '---' || trimmedLine === '***') {
      elements.push(<hr key={idx} className="my-4 border-t border-border" />);
      return;
    }

    // Headers
    if (trimmedLine.startsWith('### ')) {
      elements.push(
        <h3 key={idx} className="text-base font-semibold mt-4 mb-2 first:mt-0 text-foreground">
          {renderInlineMarkdown(trimmedLine.slice(4))}
        </h3>
      );
      return;
    }
    if (trimmedLine.startsWith('## ')) {
      elements.push(
        <h2
          key={idx}
          className="text-lg font-semibold mt-5 mb-2 first:mt-0 text-primary flex items-center gap-2"
        >
          <span className="w-1 h-5 bg-primary rounded-full" />
          {renderInlineMarkdown(trimmedLine.slice(3))}
        </h2>
      );
      return;
    }
    if (trimmedLine.startsWith('# ')) {
      elements.push(
        <h1 key={idx} className="text-xl font-bold mt-6 mb-3 first:mt-0 text-primary">
          {renderInlineMarkdown(trimmedLine.slice(2))}
        </h1>
      );
      return;
    }

    // Blockquotes
    if (trimmedLine.startsWith('> ')) {
      elements.push(
        <blockquote
          key={idx}
          className="border-l-3 border-primary bg-primary/5 pl-4 py-2 my-2 rounded-r-lg text-foreground/80 italic"
        >
          {renderInlineMarkdown(trimmedLine.slice(2))}
        </blockquote>
      );
      return;
    }

    // Bullet points
    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      const bulletContent = trimmedLine.slice(2).trim();
      if (bulletContent) {
        elements.push(
          <li key={idx} className="flex items-start gap-2 ml-2">
            <span className="text-primary shrink-0 leading-relaxed">•</span>
            <span className="flex-1 leading-relaxed">{renderInlineMarkdown(bulletContent)}</span>
          </li>
        );
      }
      return;
    }

    // Numbered lists
    const numberedMatch = trimmedLine.match(/^(\d+)\.\s/);
    if (numberedMatch) {
      const numberedContent = trimmedLine.slice(numberedMatch[0].length).trim();
      if (numberedContent) {
        elements.push(
          <li key={idx} className="flex items-start gap-2 ml-2">
            <span className="text-primary font-medium shrink-0 min-w-[1.5em] leading-relaxed">
              {numberedMatch[1]}.
            </span>
            <span className="flex-1 leading-relaxed">{renderInlineMarkdown(numberedContent)}</span>
          </li>
        );
      }
      return;
    }

    // Empty lines
    if (line.trim() === '') {
      elements.push(<div key={idx} className="h-2" />);
      return;
    }

    // Regular paragraphs
    elements.push(
      <p key={idx} className="text-foreground leading-relaxed">
        {renderInlineMarkdown(trimmedLine)}
      </p>
    );
  });

  return <div className="space-y-2 text-sm">{elements}</div>;
}

/**
 * Render inline markdown (bold, italic, code)
 */
function renderInlineMarkdown(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIdx = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    const italicMatch = remaining.match(/\*([^*]+?)\*/);
    const codeMatch = remaining.match(/`(.+?)`/);

    const matches = [
      boldMatch ? { type: 'bold', match: boldMatch, index: boldMatch.index! } : null,
      italicMatch && (!boldMatch || italicMatch.index! < boldMatch.index!)
        ? { type: 'italic', match: italicMatch, index: italicMatch.index! }
        : null,
      codeMatch ? { type: 'code', match: codeMatch, index: codeMatch.index! } : null,
    ].filter(Boolean) as Array<{ type: string; match: RegExpMatchArray; index: number }>;

    if (matches.length === 0) {
      parts.push(<span key={keyIdx++}>{remaining}</span>);
      break;
    }

    matches.sort((a, b) => a.index - b.index);
    const earliest = matches[0];

    if (earliest.index > 0) {
      parts.push(<span key={keyIdx++}>{remaining.slice(0, earliest.index)}</span>);
    }

    if (earliest.type === 'bold') {
      parts.push(
        <strong key={keyIdx++} className="font-semibold text-foreground">
          {earliest.match[1]}
        </strong>
      );
    } else if (earliest.type === 'italic') {
      parts.push(
        <em key={keyIdx++} className="text-accent-foreground">
          {earliest.match[1]}
        </em>
      );
    } else if (earliest.type === 'code') {
      parts.push(
        <code key={keyIdx++} className="bg-secondary px-1.5 py-0.5 rounded text-xs font-mono">
          {earliest.match[1]}
        </code>
      );
    }

    remaining = remaining.slice(earliest.index + earliest.match[0].length);
  }

  return <>{parts}</>;
}

export function AIInterpretation({
  dreamContent,
  mood,
  context,
  autoStart = false,
  onComplete,
  showContainer = true,
}: AIInterpretationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<SectionId>('zhougong');
  const [interpretation, setInterpretation] = useState<DreamInterpretation | null>(null);
  const [symbols, setSymbols] = useState<DreamSymbol[]>([]);
  const [fortune, setFortune] = useState<FortuneType | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  // Typewriter effect for streaming display
  const { displayedText, isAnimating, appendToBuffer, reset: resetTypewriter, flush } = useTypewriter({
    baseDelay: 20,
    minDelay: 5,
    speedUpThreshold: 100,
    adaptiveSpeed: true,
  });

  // Fetch interpretation from API
  const fetchInterpretation = useCallback(async () => {
    if (isLoading || !dreamContent.trim()) return;

    setIsLoading(true);
    setError(null);
    resetTypewriter();

    try {
      const res = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dreamContent,
          mood,
          context,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || '解梦失败');
      }

      // Handle SSE streaming response
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = '';
      let sseBuffer = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          sseBuffer += chunk;

          // Process complete lines
          const lines = sseBuffer.split('\n');
          sseBuffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const jsonStr = line.slice(6);
                if (!jsonStr.trim()) continue;
                const data = JSON.parse(jsonStr);

                if (data.text) {
                  fullText += data.text;
                  appendToBuffer(data.text);
                }

                if (data.symbols) {
                  setSymbols(data.symbols);
                }

                if (data.fortune) {
                  setFortune(data.fortune);
                }

                if (data.interpretation) {
                  setInterpretation(data.interpretation);
                }

                if (data.done) {
                  flush();
                  if (data.interpretation && data.symbols) {
                    onComplete?.(data.interpretation, data.symbols);
                  }
                }

                if (data.error) {
                  setError(data.message || '解梦失败');
                  setIsLoading(false);
                  break;
                }
              } catch (e) {
                // Skip partial chunks
              }
            }
          }
        }
      }
    } catch (e) {
      console.error('Interpret error:', e);
      setError(e instanceof Error ? e.message : '解梦失败，请重试');
    } finally {
      setIsLoading(false);
    }
  }, [dreamContent, mood, context, appendToBuffer, resetTypewriter, flush, onComplete, isLoading]);

  // Auto-start if enabled
  useEffect(() => {
    if (autoStart && !hasStarted.current && dreamContent) {
      hasStarted.current = true;
      fetchInterpretation();
    }
  }, [autoStart, dreamContent, fetchInterpretation]);

  // Auto-scroll as content streams
  useEffect(() => {
    if (contentRef.current && (isLoading || isAnimating)) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [displayedText, isLoading, isAnimating]);

  // Export handler
  const handleExport = async () => {
    if (isExporting) return;
    setIsExporting(true);

    try {
      // Use Web Share API if available
      if (navigator.share) {
        await navigator.share({
          title: 'AI 解梦结果',
          text: displayedText,
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(displayedText);
        alert('解梦结果已复制到剪贴板');
      }
    } catch (e) {
      console.error('Export failed:', e);
    } finally {
      setIsExporting(false);
    }
  };

  const cardContent = (
    <div className="space-y-4">
      {/* Section Tabs */}
      <Tabs value={activeSection} onValueChange={(v) => setActiveSection(v as SectionId)}>
        <TabsList className="grid w-full grid-cols-3 h-11">
          {Object.entries(SECTIONS).map(([id, section]) => {
            const Icon = section.icon;
            return (
              <TabsTrigger
                key={id}
                value={id}
                className="flex items-center gap-1.5 text-xs sm:text-sm"
              >
                <Icon className={`w-4 h-4 ${section.color}`} />
                <span className="hidden sm:inline">{section.label}</span>
                <span className="sm:hidden">{section.label.slice(0, 2)}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Content Area */}
        <TabsContent value={activeSection} className="mt-4">
          {/* Generate Button - Only show when no content */}
          {!displayedText && !isLoading && (
            <div className="flex flex-col items-center justify-center py-8 gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">准备好开始解梦了</p>
                <p className="text-xs text-muted-foreground/60">
                  AI 将结合周公解梦与现代心理学为您分析
                </p>
              </div>
              <Button
                onClick={fetchInterpretation}
                variant="dream"
                size="lg"
                className="gap-2 touch-feedback"
              >
                <Sparkles className="w-5 h-5" />
                开始解梦
              </Button>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
              {error}
              <Button
                variant="ghost"
                size="sm"
                onClick={fetchInterpretation}
                className="ml-2 text-destructive"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                重试
              </Button>
            </div>
          )}

          {/* Interpretation Content */}
          {(displayedText || isLoading) && (
            <div
              ref={contentRef}
              className="min-h-[200px] max-h-[60vh] overflow-y-auto rounded-lg bg-secondary/20 p-4 scroll-smooth"
            >
              {displayedText ? (
                <div className="space-y-4">
                  <MarkdownText content={displayedText} />
                  {(isLoading || isAnimating) && (
                    <span className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse rounded-sm" />
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[200px]">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">AI 正在解读您的梦境...</p>
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Fortune Indicator */}
      {fortune && (
        <div className="pt-2 border-t border-border">
          <FortuneIndicator fortune={fortune} showDescription />
        </div>
      )}

      {/* Extracted Symbols */}
      {symbols.length > 0 && (
        <div className="space-y-3 pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">梦中意象</h3>
            <span className="text-xs text-muted-foreground">{symbols.length} 个意象</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {symbols.map((symbol, idx) => (
              <SymbolCard key={idx} symbol={symbol} compact />
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {displayedText && !isLoading && (
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            className="flex-1 touch-feedback"
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Share2 className="w-4 h-4 mr-2" />
            )}
            分享结果
          </Button>
          <Button
            variant="outline"
            className="touch-feedback"
            onClick={fetchInterpretation}
            disabled={isLoading}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            重新解梦
          </Button>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-center text-muted-foreground/60 pt-2">
        AI 解梦仅供参考娱乐，不构成任何建议
      </p>
    </div>
  );

  if (!showContainer) {
    return cardContent;
  }

  return (
    <Card className="border-indigo-200/50 dark:border-indigo-800/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            AI 解梦结果
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>{cardContent}</CardContent>
    </Card>
  );
}

export default AIInterpretation;
