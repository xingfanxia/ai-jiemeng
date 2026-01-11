'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // On mount, read from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem('dream-theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
    setMounted(true);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('dream-theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    // Add transition class for smooth switch
    document.documentElement.classList.add('theme-transition');
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

    // Remove transition class after animation
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);
  };

  // Prevent hydration mismatch - render placeholder until mounted
  if (!mounted) {
    return (
      <button
        className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground opacity-0"
        aria-label="Toggle theme"
        disabled
      >
        <Sun className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors touch-feedback ${
        theme === 'dark'
          ? 'bg-primary/10 text-indigo-400'
          : 'text-muted-foreground hover:text-indigo-500 hover:bg-indigo-50'
      }`}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}

export default ThemeToggle;
