'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider, usePostHog } from '@posthog/react'
import { useEffect } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        person_profiles: 'identified_only',
        capture_pageview: true,
        capture_pageleave: true,
        capture_exceptions: true, // Enable automatic exception capture
        // Disable in development
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') {
            posthog.debug()
          }
        },
      })
    }
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}

// Hook to track custom events
export function useTrackEvent() {
  const posthog = usePostHog()

  return {
    trackDreamSubmit: (metadata?: Record<string, unknown>) => {
      posthog?.capture('dream_submitted', {
        ...metadata,
        timestamp: new Date().toISOString(),
      })
    },
    trackInterpretationComplete: (metadata?: Record<string, unknown>) => {
      posthog?.capture('interpretation_complete', {
        ...metadata,
        timestamp: new Date().toISOString(),
      })
    },
    trackGuidanceRequested: (metadata?: Record<string, unknown>) => {
      posthog?.capture('guidance_requested', {
        ...metadata,
        timestamp: new Date().toISOString(),
      })
    },
    trackGuidanceComplete: (metadata?: Record<string, unknown>) => {
      posthog?.capture('guidance_complete', {
        ...metadata,
        timestamp: new Date().toISOString(),
      })
    },
    trackEvent: (eventName: string, properties?: Record<string, unknown>) => {
      posthog?.capture(eventName, properties)
    },
  }
}
