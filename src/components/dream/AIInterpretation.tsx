'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Sparkles, RefreshCw, Share2, Download, Loader2, BookOpen, Compass, Lock, Save, Check } from 'lucide-react';
import { domToPng } from 'modern-screenshot';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useTypewriter } from '@/hooks/useTypewriter';
import { useAuth, savePendingDreamState } from '@/components/auth/AuthProvider';
import { AuthModal } from '@/components/auth/AuthModal';
import { SymbolCard } from './SymbolCard';
import { FortuneIndicator } from './FortuneIndicator';
import { useTrackEvent } from '@/app/posthog-provider';
import type { DreamSymbol, DreamInterpretation, DreamMood } from '@/lib/types/dream';
import type { FortuneType } from '@/lib/knowledge/fortune';

/**
 * Two-tab configuration: 解梦 + 指引
 */
const TABS = {
  interpretation: {
    id: 'interpretation',
    label: '解梦',
    icon: BookOpen,
    color: 'text-amber-600 dark:text-amber-400',
  },
  guidance: {
    id: 'guidance',
    label: '指引',
    icon: Compass,
    color: 'text-emerald-600 dark:text-emerald-400',
  },
} as const;

type TabId = keyof typeof TABS;

interface AIInterpretationProps {
  /** The dream content being interpreted */
  dreamContent: string;
  /** Optional moods for context (can be multiple) */
  mood?: DreamMood[];
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
  /** Pre-loaded interpretation (for viewing saved dreams) */
  savedInterpretation?: string | null;
  /** Pre-loaded guidance (for viewing saved dreams) */
  savedGuidance?: string | null;
  /** Pre-loaded symbols (for viewing saved dreams) */
  savedSymbols?: string[];
  /** Pre-loaded fortune (for viewing saved dreams) */
  savedFortune?: FortuneType | null;
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
  savedInterpretation,
  savedGuidance,
  savedSymbols,
  savedFortune,
}: AIInterpretationProps) {
  const { user, refreshCredits } = useAuth();
  const { trackGuidanceRequested, trackGuidanceComplete } = useTrackEvent();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('interpretation');
  const [interpretation, setInterpretation] = useState<DreamInterpretation | null>(null);
  const [symbols, setSymbols] = useState<DreamSymbol[]>([]);
  const [fortune, setFortune] = useState<FortuneType | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Save dream state
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Guidance state (two-step unlock flow)
  const [guidanceLocked, setGuidanceLocked] = useState(true);
  const [guidanceContent, setGuidanceContent] = useState('');
  const [guidanceLoading, setGuidanceLoading] = useState(false);
  const [guidanceError, setGuidanceError] = useState<string | null>(null);
  
  // Auth modal state for login prompt
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // Store interpretation text for passing to guidance API
  const [interpretationText, setInterpretationText] = useState('');

  const contentRef = useRef<HTMLDivElement>(null);
  const guidanceContentRef = useRef<HTMLDivElement>(null);
  const exportAreaRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  // Check if native share is available (mobile)
  const canShare = typeof navigator !== 'undefined' &&
    typeof navigator.share === 'function' &&
    typeof navigator.canShare === 'function';

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
    setInterpretationText('');
    // Reset guidance state when re-interpreting
    setGuidanceLocked(true);
    setGuidanceContent('');
    setGuidanceError(null);

    try {
      const res = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dreamContent,
          moods: mood,  // Pass as moods array
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

                // Handle text chunks (API sends { type: 'text', content: '...' })
                if (data.type === 'text' && data.content) {
                  fullText += data.content;
                  appendToBuffer(data.content);
                } else if (data.text) {
                  // Fallback for legacy format
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

                if (data.type === 'done' || data.done) {
                  flush();
                  // Store interpretation text for guidance API
                  setInterpretationText(fullText);
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

  // Fetch guidance from API (unlock flow)
  const fetchGuidance = useCallback(async () => {
    if (guidanceLoading || !interpretationText || !dreamContent.trim()) return;

    // Track guidance request
    trackGuidanceRequested({
      dreamLength: dreamContent.length,
      interpretationLength: interpretationText.length,
    });

    setGuidanceLoading(true);
    setGuidanceError(null);
    setGuidanceContent('');

    try {
      const res = await fetch('/api/guidance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dreamContent,
          interpretation: interpretationText,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        // Handle specific error codes
        if (data.code === 'UNAUTHORIZED') {
          setGuidanceError('请先登录后再解锁指引');
          setShowAuthModal(true);
          return;
        }
        if (data.code === 'INSUFFICIENT_CREDITS') {
          setGuidanceError(`积分不足，当前剩余 ${data.remaining_credits ?? 0} 积分`);
          return;
        }
        throw new Error(data.error || '获取指引失败');
      }

      // Unlock immediately when request is accepted
      setGuidanceLocked(false);
      // Refresh credits display after deduction
      refreshCredits();

      // Handle SSE streaming response
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
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

                // Handle text chunks
                if (data.type === 'text' && data.content) {
                  setGuidanceContent(prev => prev + data.content);
                }

                if (data.type === 'error') {
                  setGuidanceError(data.error || '获取指引失败');
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
      console.error('Guidance error:', e);
      setGuidanceError(e instanceof Error ? e.message : '获取指引失败，请重试');
    } finally {
      setGuidanceLoading(false);
      // Track guidance completion if successful (no error set)
      if (!guidanceError) {
        trackGuidanceComplete({
          dreamLength: dreamContent.length,
        });
      }
    }
  }, [dreamContent, interpretationText, guidanceLoading, refreshCredits, trackGuidanceRequested, trackGuidanceComplete, guidanceError]);

  // Auto-start if enabled
  useEffect(() => {
    if (autoStart && !hasStarted.current && dreamContent) {
      hasStarted.current = true;
      // If we have saved data, display it directly instead of fetching
      if (savedInterpretation) {
        setInterpretationText(savedInterpretation);
        appendToBuffer(savedInterpretation);
        flush();
        if (savedFortune) setFortune(savedFortune);
        if (savedSymbols && savedSymbols.length > 0) {
          // Convert string[] to DreamSymbol[]
          setSymbols(savedSymbols.map((name, i) => ({
            name,
            meaning: '',
            category: 'abstract' as const,
            significance: 'medium' as const,
          })));
        }
        if (savedGuidance) {
          setGuidanceContent(savedGuidance);
          setGuidanceLocked(false);
        }
        setIsSaved(true); // Mark as already saved
      } else {
        fetchInterpretation();
      }
    }
  }, [autoStart, dreamContent, fetchInterpretation, savedInterpretation, savedGuidance, savedSymbols, savedFortune, appendToBuffer, flush]);

  // Auto-scroll as content streams (interpretation)
  useEffect(() => {
    if (contentRef.current && (isLoading || isAnimating)) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [displayedText, isLoading, isAnimating]);

  // Auto-scroll as guidance content streams
  useEffect(() => {
    if (guidanceContentRef.current && guidanceLoading) {
      guidanceContentRef.current.scrollTop = guidanceContentRef.current.scrollHeight;
    }
  }, [guidanceContent, guidanceLoading]);

  // Download helper (same as bazi-app)
  const downloadImage = (dataUrl: string, name: string) => {
    const link = document.createElement('a');
    link.download = name;
    link.href = dataUrl;
    link.click();
  };

  // Save dream to journal
  const handleSaveDream = async () => {
    if (isSaving || isSaved) return;

    // Check if user is logged in
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/dreams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: dreamContent,
          title: dreamContent.slice(0, 50) + (dreamContent.length > 50 ? '...' : ''),
          dream_type: 'normal',
          dream_date: new Date().toISOString().split('T')[0],
          extracted_symbols: symbols.map(s => s.name),
          interpretations: {
            interpretation: interpretationText,
            guidance: guidanceContent || null,
          },
          fortune_type: fortune || null,
          // mood_before expects { emotion: string, intensity: number } format
          mood_before: mood?.[0] ? { emotion: mood[0], intensity: 5 } : null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '保存失败');
      }

      setIsSaved(true);
    } catch (err) {
      console.error('Save dream error:', err);
      // Could show toast error here
    } finally {
      setIsSaving(false);
    }
  };

  // Export handler - captures image and shares/downloads (same pattern as bazi-app)
  const handleExport = async () => {
    if (isExporting || !exportAreaRef.current) return;
    setIsExporting(true);

    try {
      const element = exportAreaRef.current;

      // Hide export-hide elements and show watermark
      const exportHideElements = element.querySelectorAll('.export-hide');
      const watermarkElements = element.querySelectorAll('.watermark');

      // Expand scrollable content areas to show full content (critical for screenshot)
      const scrollableElements = element.querySelectorAll('.overflow-y-auto');
      scrollableElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.setProperty('max-height', 'none', 'important');
        htmlEl.style.setProperty('overflow', 'visible', 'important');
      });

      exportHideElements.forEach(el => ((el as HTMLElement).style.display = 'none'));
      watermarkElements.forEach(el => el.classList.add('watermark-visible'));

      // Capture screenshot with dark/light mode support
      const isDark = document.documentElement.classList.contains('dark');
      const dataUrl = await domToPng(element, {
        scale: 2,
        backgroundColor: isDark ? '#1a1512' : '#faf8f5',
      });

      // Restore hidden elements and scrollable containers
      exportHideElements.forEach(el => ((el as HTMLElement).style.display = ''));
      watermarkElements.forEach(el => el.classList.remove('watermark-visible'));
      scrollableElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.removeProperty('max-height');
        htmlEl.style.removeProperty('overflow');
      });

      const timestamp = Date.now();
      const fullFilename = `周公解梦-${timestamp}.png`;

      // Convert data URL to blob for sharing
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], fullFilename, { type: 'image/png' });

      // Try native share first (mobile)
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: '周公解梦',
          });
        } catch {
          // User cancelled or share failed, fall back to download
          downloadImage(dataUrl, fullFilename);
        }
      } else {
        // Desktop: download directly
        downloadImage(dataUrl, fullFilename);
      }
    } catch (e) {
      console.error('Export failed:', e);
      alert('导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  // Check if interpretation is complete and ready for guidance
  const canUnlockGuidance = !!interpretationText && !isLoading && !isAnimating;

  const cardContent = (
    <div ref={exportAreaRef} className="space-y-4">
      {/* Watermark - hidden by default, shown during export */}
      <div className="watermark">
        <div className="flex items-center justify-center gap-2 py-3 border-b border-border mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            周公解梦
          </span>
        </div>
      </div>

      {/* Two Tabs: 解梦 + 指引 */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabId)}>
        <TabsList className="grid w-full grid-cols-2 h-11">
          {Object.entries(TABS).map(([id, tab]) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={id}
                value={id}
                className="flex items-center gap-2 text-sm"
              >
                <Icon className={`w-4 h-4 ${tab.color}`} />
                {tab.label}
                {id === 'guidance' && guidanceLocked && canUnlockGuidance && (
                  <Lock className="w-3 h-3 text-muted-foreground" />
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* 解梦 Tab */}
        <TabsContent value="interpretation" className="mt-4">
          {/* Generate Button - Only show when no content */}
          {!displayedText && !isLoading && (
            <div className="flex flex-col items-center justify-center py-8 gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">准备好开始解梦了</p>
                <p className="text-xs text-muted-foreground/60">
                  周公解梦大师将为您解读梦境
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

        {/* 指引 Tab */}
        <TabsContent value="guidance" className="mt-4">
          {/* Locked State */}
          {guidanceLocked && !guidanceLoading && (
            <div className="flex flex-col items-center justify-center py-8 gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                <Lock className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-foreground font-medium">解锁后查看周公指引</p>
                <p className="text-xs text-muted-foreground/60">
                  获取基于您梦境的个人化运势指引
                </p>
              </div>
              {guidanceError && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center max-w-xs">
                  {guidanceError}
                </div>
              )}
              <Button
                onClick={fetchGuidance}
                variant="dream"
                size="lg"
                className="gap-2 touch-feedback"
                disabled={!canUnlockGuidance}
              >
                <Compass className="w-5 h-5" />
                解锁指引 (1积分)
              </Button>
              {!canUnlockGuidance && !guidanceError && (
                <p className="text-xs text-muted-foreground">
                  请先完成解梦后再解锁指引
                </p>
              )}
            </div>
          )}

          {/* Loading State */}
          {guidanceLoading && !guidanceContent && (
            <div className="flex flex-col items-center justify-center h-[200px]">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Compass className="w-5 h-5 text-primary animate-pulse" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">正在生成运势指引...</p>
            </div>
          )}

          {/* Guidance Content (unlocked) */}
          {!guidanceLocked && guidanceContent && (
            <div
              ref={guidanceContentRef}
              className="min-h-[200px] max-h-[60vh] overflow-y-auto rounded-lg bg-secondary/20 p-4 scroll-smooth"
            >
              <div className="space-y-4">
                <MarkdownText content={guidanceContent} />
                {guidanceLoading && (
                  <span className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse rounded-sm" />
                )}
              </div>
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

      {/* Action Buttons - hidden in export */}
      {displayedText && !isLoading && (
        <div className="export-hide flex gap-2 pt-2">
          <Button
            variant="outline"
            className="flex-1 touch-feedback"
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : canShare ? (
              <Share2 className="w-4 h-4 mr-2" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            {canShare ? '分享' : '保存图片'}
          </Button>
          <Button
            variant={isSaved ? 'default' : 'outline'}
            className="touch-feedback"
            onClick={handleSaveDream}
            disabled={isSaving || isSaved}
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : isSaved ? (
              <Check className="w-4 h-4 mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {isSaved ? '已保存' : '保存'}
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

      {/* Disclaimer - shown always */}
      <p className="text-xs text-center text-muted-foreground/60 pt-2">
        AI 解梦仅供参考娱乐，不构成任何建议
      </p>

      {/* Export watermark footer - hidden by default, shown during export */}
      <div className="watermark">
        <div className="pt-4 mt-4 border-t border-border text-center space-y-1">
          <p className="text-xs text-muted-foreground">
            {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-xs text-muted-foreground/60">
            周公解梦 AI - 解读您的梦境
          </p>
        </div>
      </div>
    </div>
  );

  if (!showContainer) {
    return (
      <>
        {cardContent}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultMode="login"
          onBeforeOAuthRedirect={() => {
            // Save dream state to localStorage before OAuth redirect
            savePendingDreamState({
              dreamContent,
              moods: mood,
              context,
              showResult: true,
            });
          }}
        />
      </>
    );
  }

  return (
    <>
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
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode="login"
        onBeforeOAuthRedirect={() => {
          // Save dream state to localStorage before OAuth redirect
          savePendingDreamState({
            dreamContent,
            moods: mood,
            context,
            showResult: true,
          });
        }}
      />
    </>
  );
}

export default AIInterpretation;
