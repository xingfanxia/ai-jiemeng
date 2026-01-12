'use client';

import { useState } from 'react';
import { Moon, Send, Calendar, Clock, User, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import type { DreamMood } from '@/lib/types/dream';

/**
 * 十二时辰 - Traditional Chinese hours
 */
const SHICHEN_OPTIONS = [
  { value: 'zi', label: '子时 (23:00-01:00)', description: '夜半' },
  { value: 'chou', label: '丑时 (01:00-03:00)', description: '鸡鸣' },
  { value: 'yin', label: '寅时 (03:00-05:00)', description: '平旦' },
  { value: 'mao', label: '卯时 (05:00-07:00)', description: '日出' },
  { value: 'chen', label: '辰时 (07:00-09:00)', description: '食时' },
  { value: 'si', label: '巳时 (09:00-11:00)', description: '隅中' },
  { value: 'wu', label: '午时 (11:00-13:00)', description: '日中' },
  { value: 'wei', label: '未时 (13:00-15:00)', description: '日昳' },
  { value: 'shen', label: '申时 (15:00-17:00)', description: '哺时' },
  { value: 'you', label: '酉时 (17:00-19:00)', description: '日入' },
  { value: 'xu', label: '戌时 (19:00-21:00)', description: '黄昏' },
  { value: 'hai', label: '亥时 (21:00-23:00)', description: '人定' },
] as const;

/**
 * Mood options with Chinese labels
 */
const MOOD_OPTIONS: { value: DreamMood; label: string; emoji: string }[] = [
  { value: 'peaceful', label: '平静', emoji: '😌' },
  { value: 'joyful', label: '喜悦', emoji: '😊' },
  { value: 'anxious', label: '焦虑', emoji: '😰' },
  { value: 'fearful', label: '恐惧', emoji: '😨' },
  { value: 'confused', label: '困惑', emoji: '😕' },
  { value: 'adventurous', label: '冒险', emoji: '🤩' },
  { value: 'nostalgic', label: '怀旧', emoji: '🥹' },
  { value: 'romantic', label: '浪漫', emoji: '🥰' },
  { value: 'mysterious', label: '神秘', emoji: '🔮' },
  { value: 'neutral', label: '中性', emoji: '😐' },
];

export interface DreamFormData {
  dreamContent: string;
  dreamDate?: string;
  dreamTime?: string;
  moods?: DreamMood[];  // Changed from mood?: DreamMood to support multi-select
  gender?: 'male' | 'female' | 'other';
  isPregnant?: boolean;
  context?: string;
}

interface DreamFormProps {
  onSubmit: (data: DreamFormData) => Promise<void>;
  isLoading?: boolean;
  initialData?: Partial<DreamFormData>;
}

const MAX_CHARS = 5000;

export function DreamForm({ onSubmit, isLoading = false, initialData }: DreamFormProps) {
  const [dreamContent, setDreamContent] = useState(initialData?.dreamContent || '');
  const [dreamDate, setDreamDate] = useState(initialData?.dreamDate || '');
  const [dreamTime, setDreamTime] = useState(initialData?.dreamTime || '');
  const [moods, setMoods] = useState<DreamMood[]>(initialData?.moods || []);  // Changed to array
  const [gender, setGender] = useState<'male' | 'female' | 'other' | undefined>(
    initialData?.gender
  );
  const [isPregnant, setIsPregnant] = useState(initialData?.isPregnant || false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Toggle mood in/out of selection
  const toggleMood = (moodValue: DreamMood) => {
    setMoods(prev => 
      prev.includes(moodValue)
        ? prev.filter(m => m !== moodValue)
        : [...prev, moodValue]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dreamContent.trim() || isLoading) return;

    await onSubmit({
      dreamContent: dreamContent.trim(),
      dreamDate: dreamDate || undefined,
      dreamTime: dreamTime || undefined,
      moods: moods.length > 0 ? moods : undefined,  // Changed from mood
      gender,
      isPregnant: gender === 'female' ? isPregnant : undefined,
    });
  };

  const charCount = dreamContent.length;
  const isOverLimit = charCount > MAX_CHARS;

  return (
    <Card className="dream-gradient-subtle border-indigo-200/50 dark:border-indigo-800/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Moon className="w-5 h-5 text-primary" />
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            记录你的梦境
          </span>
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          描述你梦中的场景、人物、感受，越详细解读越准确
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dream Content - Main Field */}
          <div className="space-y-2">
            <Label htmlFor="dreamContent" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              梦境描述
              <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="dreamContent"
              placeholder="昨晚我梦见自己在一片广阔的海洋上飞翔，海水清澈透明，能看到五彩斑斓的鱼儿在水中游动。突然，我开始向水面下落..."
              value={dreamContent}
              onChange={(e) => setDreamContent(e.target.value)}
              className={`min-h-[180px] resize-none text-base leading-relaxed ${
                isOverLimit ? 'border-destructive focus-visible:ring-destructive/30' : ''
              }`}
              disabled={isLoading}
            />
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">
                提示：包含场景、人物、颜色、情感等细节效果更好
              </span>
              <span
                className={`tabular-nums ${
                  isOverLimit
                    ? 'text-destructive'
                    : charCount > MAX_CHARS * 0.8
                      ? 'text-amber-500'
                      : 'text-muted-foreground'
                }`}
              >
                {charCount} / {MAX_CHARS}字
              </span>
            </div>
          </div>

          {/* Mood Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-500" />
              梦中情绪
              <span className="text-muted-foreground text-xs">（可多选）</span>
            </Label>
            <div className="flex flex-wrap gap-2">
              {MOOD_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleMood(option.value)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all touch-feedback ${
                    moods.includes(option.value)
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary'
                  }`}
                  disabled={isLoading}
                >
                  <span className="mr-1">{option.emoji}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Options Toggle */}
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          >
            <span>{showAdvanced ? '收起' : '展开'}高级选项</span>
            <span className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {/* Advanced Options */}
          {showAdvanced && (
            <div className="space-y-4 pt-2 border-t border-border/50">
              {/* Date and Time Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dreamDate" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    做梦日期
                  </Label>
                  <Input
                    id="dreamDate"
                    type="date"
                    value={dreamDate}
                    onChange={(e) => setDreamDate(e.target.value)}
                    className="text-sm"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dreamTime" className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-500" />
                    做梦时辰
                  </Label>
                  <select
                    id="dreamTime"
                    value={dreamTime}
                    onChange={(e) => setDreamTime(e.target.value)}
                    className="flex h-10 w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                    disabled={isLoading}
                  >
                    <option value="">请选择时辰</option>
                    {SHICHEN_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Context Options Row */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <User className="w-4 h-4 text-green-500" />
                  个人信息
                  <span className="text-muted-foreground text-xs">
                    （某些梦象对不同人群有不同解读）
                  </span>
                </Label>

                {/* Gender Selection */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground">性别：</span>
                  {[
                    { value: 'male', label: '男' },
                    { value: 'female', label: '女' },
                    { value: 'other', label: '其他' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setGender(
                          gender === option.value
                            ? undefined
                            : (option.value as 'male' | 'female' | 'other')
                        )
                      }
                      className={`px-3 py-1 rounded-lg text-sm transition-all touch-feedback ${
                        gender === option.value
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary'
                      }`}
                      disabled={isLoading}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                {/* Pregnancy Toggle - Only show for female */}
                {gender === 'female' && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-pink-50/50 dark:bg-pink-950/20 border border-pink-200/50 dark:border-pink-800/50">
                    <input
                      type="checkbox"
                      id="isPregnant"
                      checked={isPregnant}
                      onChange={(e) => setIsPregnant(e.target.checked)}
                      className="w-4 h-4 rounded border-pink-300 text-pink-500 focus:ring-pink-500"
                      disabled={isLoading}
                    />
                    <Label
                      htmlFor="isPregnant"
                      className="text-sm text-pink-700 dark:text-pink-300 cursor-pointer"
                    >
                      我是孕妇（胎梦有特殊解读）
                    </Label>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="dream"
              size="lg"
              className="w-full gap-2 touch-feedback"
              disabled={!dreamContent.trim() || isOverLimit || isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  解梦中...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  开始解梦
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default DreamForm;
