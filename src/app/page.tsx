'use client';

import { useState, useCallback, useEffect } from 'react';
import { Moon, Sparkles, BookOpen, Star, CloudMoon, Stars } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { UserMenu } from '@/components/auth';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Footer } from '@/components/ui/Footer';
import { DreamForm, AIInterpretation, DreamJournal } from '@/components/dream';
import type { DreamFormData } from '@/components/dream';
import type { DreamSymbol, DreamInterpretation, DreamMood } from '@/lib/types/dream';
import { useTrackEvent } from './posthog-provider';
import { useAuth, getPendingDreamState, clearPendingDreamState } from '@/components/auth/AuthProvider';

export default function Home() {
  const [dreamContent, setDreamContent] = useState('');
  const [dreamMoods, setDreamMoods] = useState<DreamMood[]>([]);
  const [dreamContext, setDreamContext] = useState<{
    gender?: 'male' | 'female' | 'other';
    isPregnant?: boolean;
    dreamTime?: string;
  }>({});
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  const [interpretation, setInterpretation] = useState<DreamInterpretation | null>(null);
  const [symbols, setSymbols] = useState<DreamSymbol[]>([]);
  // Track if we restored from pending state (to auto-start interpretation)
  const [restoredFromPending, setRestoredFromPending] = useState(false);

  // Auth hook to check user state
  const { user, isLoading: isAuthLoading } = useAuth();

  // PostHog event tracking
  const { trackDreamSubmit, trackInterpretationComplete } = useTrackEvent();

  // Restore pending dream state after OAuth redirect
  useEffect(() => {
    // Wait for auth to finish loading
    if (isAuthLoading) return;
    
    // Only restore if user is now logged in (just completed OAuth)
    if (!user) return;
    
    const pendingState = getPendingDreamState();
    if (pendingState && pendingState.dreamContent) {
      // Restore dream state
      setDreamContent(pendingState.dreamContent);
      if (pendingState.moods) {
        setDreamMoods(pendingState.moods as DreamMood[]);
      }
      if (pendingState.context) {
        setDreamContext(pendingState.context);
      }
      if (pendingState.showResult) {
        setShowResult(true);
        setRestoredFromPending(true);
      }
      // Clear the pending state after restoration
      clearPendingDreamState();
    }
  }, [user, isAuthLoading]);

  // Handle form submission
  const handleInterpret = useCallback(async (data: DreamFormData) => {
    if (!data.dreamContent.trim()) return;

    // Track dream submission
    trackDreamSubmit({
      dreamLength: data.dreamContent.length,
      hasMoods: (data.moods?.length || 0) > 0,
      moodCount: data.moods?.length || 0,
      hasGender: !!data.gender,
      hasDreamTime: !!data.dreamTime,
    });

    setDreamContent(data.dreamContent);
    setDreamMoods(data.moods || []);
    setDreamContext({
      gender: data.gender,
      isPregnant: data.isPregnant,
      dreamTime: data.dreamTime,
    });
    setIsInterpreting(true);
    setShowResult(true);
  }, [trackDreamSubmit]);

  // Handle interpretation complete
  const handleInterpretComplete = useCallback(
    (interp: DreamInterpretation, syms: DreamSymbol[]) => {
      // Track interpretation completion
      trackInterpretationComplete({
        symbolCount: syms.length,
        interpretationLength: interp?.detailed?.length || 0,
      });

      setInterpretation(interp);
      setSymbols(syms);
      setIsInterpreting(false);
    },
    [trackInterpretationComplete]
  );

  // Reset to start new interpretation
  const handleReset = useCallback(() => {
    setDreamContent('');
    setDreamMoods([]);
    setDreamContext({});
    setShowResult(false);
    setInterpretation(null);
    setSymbols([]);
    setIsInterpreting(false);
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Mystical Background Effect (dark mode only) */}
      <div className="dark:starfield fixed inset-0 pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Moon className="w-7 h-7 text-primary" />
              <Stars className="w-3 h-3 text-amber-400 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI 周公解梦
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {/* Journal Button */}
            <button
              onClick={() => setShowJournal(true)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors touch-feedback"
              title="梦境日志"
            >
              <BookOpen className="w-5 h-5" />
            </button>
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-primary text-sm border border-indigo-200/50 dark:border-indigo-800/50">
              <Sparkles className="w-4 h-4" />
              融合传统解梦智慧与现代心理学
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              揭开梦境的
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
                神秘面纱
              </span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              描述你的梦境，AI 将结合周公解梦古籍与弗洛伊德心理分析，
              为你解读梦中的象征意义与潜意识信息。
            </p>
          </div>

          {/* Dream Form or Interpretation Result */}
          {!showResult ? (
            <DreamForm onSubmit={handleInterpret} isLoading={isInterpreting} />
          ) : (
            <div className="space-y-6">
              {/* Back Button */}
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <span>← 返回重新解梦</span>
              </button>

              {/* Dream Content Preview */}
              <Card className="p-4 bg-secondary/20 border-dashed">
                <div className="flex items-start gap-3">
                  <CloudMoon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div className="space-y-1 min-w-0">
                    <p className="text-xs text-muted-foreground">你的梦境</p>
                    <p className="text-sm text-foreground line-clamp-3">{dreamContent}</p>
                  </div>
                </div>
              </Card>

              {/* AI Interpretation */}
              <AIInterpretation
                dreamContent={dreamContent}
                mood={dreamMoods}
                context={dreamContext}
                autoStart={true}
                onComplete={handleInterpretComplete}
              />
            </div>
          )}

          {/* Feature Tips - Only show on initial view */}
          {!showResult && (
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  icon: <Star className="w-6 h-6" />,
                  title: '周公解梦',
                  description: '基于《周公解梦》等古籍的传统解读',
                  color: 'text-amber-500',
                },
                {
                  icon: <CloudMoon className="w-6 h-6" />,
                  title: '心理分析',
                  description: '融合荣格、弗洛伊德的心理学理论',
                  color: 'text-blue-500',
                },
                {
                  icon: <Sparkles className="w-6 h-6" />,
                  title: '吉凶预测',
                  description: '根据梦象分析运势走向',
                  color: 'text-purple-500',
                },
              ].map((tip, index) => (
                <Card key={index} className="text-center p-4 dream-gradient-subtle">
                  <div className={`text-3xl mb-2 ${tip.color}`}>{tip.icon}</div>
                  <h3 className="font-medium text-foreground">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{tip.description}</p>
                </Card>
              ))}
            </div>
          )}

          {/* Dream Categories Showcase - Only on initial view */}
          {!showResult && (
            <div className="text-center space-y-4 pt-4">
              <p className="text-sm text-muted-foreground">支持解析各类梦境意象</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  '天象',
                  '动物',
                  '人物',
                  '身体',
                  '植物',
                  '建筑',
                  '器物',
                  '活动',
                  '情感',
                  '鬼神',
                ].map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 text-xs rounded-full bg-secondary/50 text-secondary-foreground"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Dream Journal Dialog */}
      <DreamJournal isOpen={showJournal} onClose={() => setShowJournal(false)} />
    </div>
  );
}
