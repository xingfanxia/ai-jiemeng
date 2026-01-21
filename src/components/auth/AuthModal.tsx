'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Loader2, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from './AuthProvider';
import { getPendingReferral } from '@/hooks/useReferralCapture';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
  /** Callback to save state before OAuth redirect (e.g., save dream content to localStorage) */
  onBeforeOAuthRedirect?: () => void;
}

export function AuthModal({ isOpen, onClose, defaultMode = 'login', onBeforeOAuthRedirect }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const { signInWithEmail, signUpWithEmail, signInWithGoogle, signInWithTwitter } = useAuth();

  // For SSR safety - only render portal on client
  useEffect(() => {
    setMounted(true);
    // Pre-fill referral code from URL if captured
    const pending = getPendingReferral();
    if (pending?.code) {
      setReferralCode(pending.code);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    // Translate common Supabase errors to Chinese
    const translateError = (msg: string) => {
      if (msg.includes('Email not confirmed')) return '邮箱未验证，请查看收件箱';
      if (msg.includes('Invalid login credentials')) return '邮箱或密码错误';
      if (msg.includes('already registered')) return '该邮箱已注册，请直接登录';
      if (msg.includes('Password should be')) return '密码至少需要6个字符';
      if (msg.includes('rate limit')) return '操作过于频繁，请稍后再试';
      return msg;
    };

    try {
      if (mode === 'login') {
        const { error } = await signInWithEmail(email, password);
        if (error) {
          setError(translateError(error.message));
        } else {
          onClose();
        }
      } else {
        const { error } = await signUpWithEmail(email, password, referralCode.trim() || undefined);
        if (error) {
          setError(translateError(error.message));
        } else {
          setSuccess('注册成功！请查看邮箱完成验证。');
        }
      }
    } catch {
      setError('操作失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    // Save state before OAuth redirect
    onBeforeOAuthRedirect?.();
    // Pass referral code from URL or input field
    const pending = getPendingReferral();
    const refCode = referralCode.trim() || pending?.code;
    const { error } = await signInWithGoogle(refCode);
    if (error) {
      setError(error.message);
    }
  };

  const handleTwitterSignIn = async () => {
    setError(null);
    // Save state before OAuth redirect
    onBeforeOAuthRedirect?.();
    // Pass referral code from URL or input field
    const pending = getPendingReferral();
    const refCode = referralCode.trim() || pending?.code;
    const { error } = await signInWithTwitter(refCode);
    if (error) {
      setError(error.message);
    }
  };

  // Don't render on server or when not open
  if (!mounted || !isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-md my-auto bg-card rounded-2xl shadow-xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 pb-4 border-b border-border">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
            <h2 className="text-xl font-semibold text-foreground">
              {mode === 'login' ? '登录' : '注册'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === 'login'
                ? '登录后可保存和管理您的解梦记录'
                : '注册账号以保存您的解梦记录'}
            </p>
          </div>

          {/* Signup benefits banner */}
          {mode === 'signup' && (
            <div className="mx-6 mt-4 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
              <p className="text-sm text-indigo-700 dark:text-indigo-400">
                新用户可获得 <strong>10次免费</strong> 解梦额度
              </p>
              <p className="text-xs text-indigo-600/80 dark:text-indigo-500/80 mt-1">
                每日还可获得2次免费额度
              </p>
            </div>
          )}

          {/* Body */}
          <div className="p-6 space-y-4">
            {/* Google Sign In */}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {mode === 'login' ? '使用 Google 登录' : '使用 Google 注册'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">或</span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="邮箱地址"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {/* Referral code input - only show on signup */}
              {mode === 'signup' && (
                <div className="space-y-2">
                  <div className="relative">
                    <Gift className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="推荐码 (选填)"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-3 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 text-sm">
                  {success}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : mode === 'login' ? (
                  <User className="w-4 h-4 mr-2" />
                ) : (
                  <User className="w-4 h-4 mr-2" />
                )}
                {mode === 'login' ? '登录' : '注册'}
              </Button>
            </form>
          </div>

          {/* Footer */}
          <div className="p-6 pt-0 text-center">
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setError(null);
                setSuccess(null);
              }}
              className="text-sm text-primary hover:underline"
            >
              {mode === 'login' ? '没有账号？立即注册' : '已有账号？立即登录'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  // Use portal to render at document.body level, escaping any stacking context
  return createPortal(modalContent, document.body);
}
