/**
 * Server-side PostHog client for LLM analytics
 */

import { PostHog } from 'posthog-node'

let posthogClient: PostHog | null = null

export function getPostHogClient(): PostHog {
  if (!posthogClient) {
    const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST

    if (!apiKey) {
      throw new Error('NEXT_PUBLIC_POSTHOG_KEY is not set')
    }

    posthogClient = new PostHog(apiKey, {
      host: host || 'https://us.i.posthog.com',
      // Flush events immediately for serverless environments
      flushAt: 1,
      flushInterval: 0,
    })
  }
  return posthogClient
}

// Helper to capture server-side events
export function captureServerEvent(
  distinctId: string,
  eventName: string,
  properties?: Record<string, unknown>
) {
  try {
    const client = getPostHogClient()
    client.capture({
      distinctId,
      event: eventName,
      properties: {
        ...properties,
        $lib: 'posthog-node',
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('[PostHog] Failed to capture event:', error)
  }
}

// Helper to capture server-side exceptions
export function captureException(
  error: Error,
  distinctId?: string,
  properties?: Record<string, unknown>
) {
  try {
    const client = getPostHogClient()
    client.capture({
      distinctId: distinctId || 'anonymous',
      event: '$exception',
      properties: {
        $exception_message: error.message,
        $exception_type: error.name,
        $exception_stack_trace_raw: error.stack,
        ...properties,
        $lib: 'posthog-node',
        timestamp: new Date().toISOString(),
      },
    })
  } catch (captureError) {
    console.error('[PostHog] Failed to capture exception:', captureError)
  }
}

// Shutdown hook for graceful shutdown
export async function shutdownPostHog() {
  if (posthogClient) {
    await posthogClient.shutdown()
    posthogClient = null
  }
}
