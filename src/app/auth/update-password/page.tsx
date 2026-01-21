'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Loader2, CheckCircle, Moon, Stars } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSessionValid, setIsSessionValid] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Check if user has a valid recovery session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsSessionValid(true);
      } else {
        // No valid session, redirect to home
        router.push('/');
      }
    };
    checkSession();
  }, [supabase.auth, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (password.length < 6) {
      setError('密码至少需要6个字符');
      return;
    }

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        if (error.message.includes('same as old')) {
          setError('新密码不能与旧密码相同');
        } else {
          setError(error.message);
        }
      } else {
        setSuccess(true);
        // Redirect to home after 2 seconds
        setTimeout(() => {
          router.push('/');
        }, 2000);
      }
    } catch {
      setError('更新失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isSessionValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950">
        <div className="dark:starfield fixed inset-0 pointer-events-none" />
        <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950 p-4">
        <div className="dark:starfield fixed inset-0 pointer-events-none" />
        <div className="relative w-full max-w-md bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-indigo-500/20 p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-white mb-2">密码已更新！</h1>
          <p className="text-indigo-200/70">正在跳转到首页...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950 p-4">
      {/* Mystical Background Effect */}
      <div className="dark:starfield fixed inset-0 pointer-events-none" />
      
      <div className="relative w-full max-w-md bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-indigo-500/20 overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-indigo-500/20">
          <div className="flex items-center gap-2 mb-3">
            <div className="relative">
              <Moon className="w-6 h-6 text-indigo-400" />
              <Stars className="w-2.5 h-2.5 text-amber-400 absolute -top-0.5 -right-0.5" />
            </div>
            <span className="text-sm font-medium bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              AI 周公解梦
            </span>
          </div>
          <h1 className="text-xl font-semibold text-white">设置新密码</h1>
          <p className="text-sm text-indigo-200/70 mt-1">
            请输入您的新密码
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400/60" />
                <Input
                  type="password"
                  placeholder="新密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-indigo-500/30 text-white placeholder:text-indigo-300/40 focus:border-indigo-400 focus:ring-indigo-400/20"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400/60" />
                <Input
                  type="password"
                  placeholder="确认密码"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-indigo-500/30 text-white placeholder:text-indigo-300/40 focus:border-indigo-400 focus:ring-indigo-400/20"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-0 shadow-lg shadow-indigo-500/25" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Lock className="w-4 h-4 mr-2" />
              )}
              更新密码
            </Button>
          </form>

          {/* Back to home link */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
            >
              返回首页
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
