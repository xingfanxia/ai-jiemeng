'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { BookOpen, Calendar, Heart, Trash2, ChevronRight, Loader2, Search, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { FortuneBadge } from './FortuneIndicator';
import type { DreamJournalEntry, DreamMood } from '@/lib/types/dream';
import type { FortuneType } from '@/lib/knowledge/fortune';

/**
 * Mood emoji mapping
 */
const MOOD_EMOJIS: Record<DreamMood, string> = {
  peaceful: '😌',
  anxious: '😰',
  joyful: '😊',
  fearful: '😨',
  confused: '😕',
  adventurous: '🤩',
  nostalgic: '🥹',
  romantic: '🥰',
  mysterious: '🔮',
  neutral: '😐',
};

interface DreamJournalProps {
  /** Whether journal is visible (for drawer mode) */
  isOpen?: boolean;
  /** Close handler */
  onClose?: () => void;
  /** Dream selection handler */
  onSelect?: (dream: DreamJournalEntry) => void;
  /** Initial dreams data (if available) */
  initialDreams?: DreamJournalEntry[];
}

export function DreamJournal({
  isOpen = true,
  onClose,
  onSelect,
  initialDreams,
}: DreamJournalProps) {
  const [dreams, setDreams] = useState<DreamJournalEntry[]>(initialDreams || []);
  const [isLoading, setIsLoading] = useState(!initialDreams);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDream, setSelectedDream] = useState<DreamJournalEntry | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Fetch dreams from API
  useEffect(() => {
    if (initialDreams) return;

    const fetchDreams = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/dreams');
        if (res.ok) {
          const data = await res.json();
          setDreams(data.dreams || []);
        }
      } catch (e) {
        console.error('Failed to fetch dreams:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDreams();
  }, [initialDreams]);

  // Filter dreams by search query
  const filteredDreams = dreams.filter((dream) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      dream.title.toLowerCase().includes(query) ||
      dream.dreamContent.toLowerCase().includes(query) ||
      dream.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  // Handle dream deletion
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/dreams/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setDreams(dreams.filter((d) => d.id !== id));
        setDeleteConfirmId(null);
      }
    } catch (e) {
      console.error('Failed to delete dream:', e);
    }
  };

  // Handle favorite toggle
  const handleToggleFavorite = async (id: string) => {
    const dream = dreams.find((d) => d.id === id);
    if (!dream) return;

    try {
      const res = await fetch(`/api/dreams/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: !dream.isFavorite }),
      });
      if (res.ok) {
        setDreams(dreams.map((d) => (d.id === id ? { ...d, isFavorite: !d.isFavorite } : d)));
      }
    } catch (e) {
      console.error('Failed to toggle favorite:', e);
    }
  };

  // Dream card component
  const DreamCard = ({ dream }: { dream: DreamJournalEntry }) => (
    <Card
      className={`
        cursor-pointer transition-all hover:shadow-md touch-feedback
        ${dream.isFavorite ? 'ring-2 ring-amber-400/50' : ''}
      `}
      onClick={() => onSelect?.(dream) || setSelectedDream(dream)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          {/* Dream Info */}
          <div className="flex-1 min-w-0">
            {/* Title and Date */}
            <div className="flex items-center gap-2 mb-1">
              {dream.isFavorite && <Heart className="w-4 h-4 text-amber-500 fill-amber-500" />}
              <h3 className="font-medium text-foreground truncate">{dream.title}</h3>
            </div>

            {/* Date and Mood */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Calendar className="w-3 h-3" />
              <span>{format(new Date(dream.createdAt), 'MM月dd日 HH:mm', { locale: zhCN })}</span>
              {dream.mood && <span>{MOOD_EMOJIS[dream.mood]}</span>}
            </div>

            {/* Preview */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {dream.interpretationSummary || dream.dreamContent}
            </p>

            {/* Tags */}
            {dream.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {dream.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
                {dream.tags.length > 3 && (
                  <span className="text-xs text-muted-foreground">+{dream.tags.length - 3}</span>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col items-end gap-2">
            <ChevronRight className="w-5 h-5 text-muted-foreground" />

            {/* Action buttons */}
            <div className="flex gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFavorite(dream.id);
                }}
                className={`p-1.5 rounded-full transition-colors ${
                  dream.isFavorite
                    ? 'text-amber-500 hover:bg-amber-100 dark:hover:bg-amber-900/30'
                    : 'text-muted-foreground hover:bg-secondary'
                }`}
              >
                <Heart className={`w-4 h-4 ${dream.isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteConfirmId(dream.id);
                }}
                className="p-1.5 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const content = (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="搜索梦境..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-9"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-secondary"
          >
            <X className="w-3 h-3 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Dream List */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">加载梦境日志...</p>
        </div>
      ) : filteredDreams.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <BookOpen className="w-12 h-12 text-muted-foreground/30" />
          <div className="text-center">
            <p className="text-muted-foreground">
              {searchQuery ? '没有找到匹配的梦境' : '还没有保存的梦境'}
            </p>
            <p className="text-sm text-muted-foreground/60 mt-1">
              {searchQuery ? '尝试其他关键词' : '解梦后可以保存到日志'}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredDreams.map((dream) => (
            <DreamCard key={dream.id} dream={dream} />
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
            <DialogDescription>删除后无法恢复，确定要删除这个梦境记录吗？</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
              取消
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
            >
              删除
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dream Detail Dialog */}
      <Dialog open={!!selectedDream} onOpenChange={() => setSelectedDream(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          {selectedDream && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedDream.isFavorite && (
                    <Heart className="w-5 h-5 text-amber-500 fill-amber-500" />
                  )}
                  {selectedDream.title}
                </DialogTitle>
                <DialogDescription>
                  {format(new Date(selectedDream.createdAt), 'yyyy年MM月dd日 HH:mm', {
                    locale: zhCN,
                  })}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                {/* Dream Content */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">梦境内容</h4>
                  <p className="text-sm text-muted-foreground bg-secondary/30 rounded-lg p-3">
                    {selectedDream.dreamContent}
                  </p>
                </div>

                {/* Interpretation Summary */}
                {selectedDream.interpretationSummary && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">解梦摘要</h4>
                    <p className="text-sm text-foreground/80">
                      {selectedDream.interpretationSummary}
                    </p>
                  </div>
                )}

                {/* Symbols */}
                {selectedDream.symbols.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">梦中意象</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDream.symbols.map((symbol) => (
                        <span
                          key={symbol}
                          className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                        >
                          {symbol}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {selectedDream.tags.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">标签</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDream.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setSelectedDream(null)}>
                  关闭
                </Button>
                <Button variant="dream" onClick={() => onSelect?.(selectedDream)}>
                  查看完整解读
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );

  // If used as standalone component
  if (!onClose) {
    return content;
  }

  // If used as drawer/dialog
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            梦境日志
          </DialogTitle>
          <DialogDescription>查看和管理您保存的梦境记录</DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[60vh] -mx-6 px-6">{content}</div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Compact dream journal list for sidebar use
 */
export function DreamJournalList({
  dreams,
  onSelect,
  className = '',
}: {
  dreams: DreamJournalEntry[];
  onSelect?: (dream: DreamJournalEntry) => void;
  className?: string;
}) {
  if (dreams.length === 0) {
    return (
      <div className={`text-center text-muted-foreground py-4 ${className}`}>
        <p className="text-sm">暂无梦境记录</p>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {dreams.map((dream) => (
        <button
          key={dream.id}
          onClick={() => onSelect?.(dream)}
          className="w-full text-left p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors touch-feedback"
        >
          <div className="flex items-center gap-2 mb-1">
            {dream.isFavorite && <Heart className="w-3 h-3 text-amber-500 fill-amber-500" />}
            <span className="font-medium text-sm text-foreground truncate">{dream.title}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>{format(new Date(dream.createdAt), 'MM/dd', { locale: zhCN })}</span>
            {dream.mood && <span>{MOOD_EMOJIS[dream.mood]}</span>}
          </div>
        </button>
      ))}
    </div>
  );
}

export default DreamJournal;
