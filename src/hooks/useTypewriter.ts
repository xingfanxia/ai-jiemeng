'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTypewriterOptions {
  /** Base delay between characters in ms (default: 25) */
  baseDelay?: number;
  /** Minimum delay when buffer is large (default: 5) */
  minDelay?: number;
  /** Buffer size threshold to start speeding up (default: 50) */
  speedUpThreshold?: number;
  /** Whether to use adaptive speed based on buffer size (default: true) */
  adaptiveSpeed?: boolean;
}

interface UseTypewriterReturn {
  /** The text currently displayed with typewriter effect */
  displayedText: string;
  /** Whether the typewriter is still animating */
  isAnimating: boolean;
  /** Add text to the buffer (call this when new chunks arrive) */
  appendToBuffer: (text: string) => void;
  /** Reset the typewriter state */
  reset: () => void;
  /** Flush remaining buffer immediately (call on stream completion) */
  flush: () => void;
}

/**
 * Custom hook for smooth typewriter effect on streaming text
 *
 * Uses requestAnimationFrame for 60fps smooth animation with adaptive speed.
 * When buffer grows large (streaming is faster than display), automatically
 * speeds up to catch up.
 *
 * Usage:
 * ```tsx
 * const { displayedText, isAnimating, appendToBuffer, reset, flush } = useTypewriter();
 *
 * // When starting new stream:
 * reset();
 *
 * // When new chunk arrives from stream:
 * appendToBuffer(chunk);
 *
 * // When stream completes:
 * flush();
 * ```
 */
export function useTypewriter(options: UseTypewriterOptions = {}): UseTypewriterReturn {
  const {
    baseDelay = 25,
    minDelay = 5,
    speedUpThreshold = 50,
    adaptiveSpeed = true,
  } = options;

  const [displayedText, setDisplayedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  // Use refs to avoid stale closures in animation loop
  const bufferRef = useRef('');
  const displayedRef = useRef('');
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const isRunningRef = useRef(false);

  // Calculate dynamic delay based on buffer size
  const getDelay = useCallback(() => {
    if (!adaptiveSpeed) return baseDelay;

    const bufferSize = bufferRef.current.length;
    if (bufferSize <= speedUpThreshold) return baseDelay;

    // Exponential speed-up as buffer grows
    const speedFactor = Math.min(bufferSize / speedUpThreshold, 5);
    return Math.max(minDelay, baseDelay / speedFactor);
  }, [baseDelay, minDelay, speedUpThreshold, adaptiveSpeed]);

  // Animation loop using requestAnimationFrame
  const animate = useCallback((timestamp: number) => {
    if (!isRunningRef.current) return;

    const elapsed = timestamp - lastTimeRef.current;
    const delay = getDelay();

    if (elapsed >= delay && bufferRef.current.length > 0) {
      // Take one character from buffer
      const char = bufferRef.current[0];
      bufferRef.current = bufferRef.current.slice(1);
      displayedRef.current += char;

      setDisplayedText(displayedRef.current);
      lastTimeRef.current = timestamp;
    }

    // Continue animation if there's more in buffer
    if (bufferRef.current.length > 0) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      setIsAnimating(false);
      isRunningRef.current = false;
    }
  }, [getDelay]);

  // Start animation loop if not already running
  const startAnimation = useCallback(() => {
    if (isRunningRef.current) return;

    isRunningRef.current = true;
    setIsAnimating(true);
    lastTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [animate]);

  // Add text to buffer
  const appendToBuffer = useCallback((text: string) => {
    bufferRef.current += text;
    startAnimation();
  }, [startAnimation]);

  // Reset state
  const reset = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    bufferRef.current = '';
    displayedRef.current = '';
    isRunningRef.current = false;
    setDisplayedText('');
    setIsAnimating(false);
  }, []);

  // Flush remaining buffer immediately
  const flush = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Display all remaining text immediately
    if (bufferRef.current.length > 0) {
      displayedRef.current += bufferRef.current;
      bufferRef.current = '';
      setDisplayedText(displayedRef.current);
    }

    isRunningRef.current = false;
    setIsAnimating(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return {
    displayedText,
    isAnimating,
    appendToBuffer,
    reset,
    flush,
  };
}

export default useTypewriter;
