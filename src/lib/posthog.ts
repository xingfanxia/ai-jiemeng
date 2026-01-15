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

/**
 * Flush all pending PostHog events
 * CRITICAL: Call this at the end of serverless functions to ensure events are sent
 */
export async function flushPostHog(): Promise<void> {
  if (posthogClient) {
    await posthogClient.flush()
  }
}

// Shutdown hook for graceful shutdown
export async function shutdownPostHog() {
  if (posthogClient) {
    await posthogClient.shutdown()
    posthogClient = null
  }
}

// ==================== Feature Flag Functions ====================

/**
 * Get a feature flag value for a user
 * @param flagKey - The feature flag key
 * @param distinctId - User ID
 * @param defaultValue - Default value if flag not found
 * @returns The flag value (boolean for simple flags, string for multivariate)
 */
export async function getFeatureFlag(
  flagKey: string,
  distinctId: string,
  defaultValue?: string | boolean
): Promise<string | boolean | undefined> {
  try {
    const client = getPostHogClient()
    const value = await client.getFeatureFlag(flagKey, distinctId)
    return value ?? defaultValue
  } catch (error) {
    console.error('[PostHog] Error fetching feature flag:', error)
    return defaultValue
  }
}

/**
 * Get a feature flag payload (additional data attached to the flag)
 * @param flagKey - The feature flag key
 * @param distinctId - User ID
 * @returns The flag payload or undefined
 */
export async function getFeatureFlagPayload(
  flagKey: string,
  distinctId: string
): Promise<Record<string, unknown> | undefined> {
  try {
    const client = getPostHogClient()
    const payload = await client.getFeatureFlagPayload(flagKey, distinctId)
    return payload as Record<string, unknown> | undefined
  } catch (error) {
    console.error('[PostHog] Error fetching feature flag payload:', error)
    return undefined
  }
}

/**
 * Check if a feature flag is enabled (for boolean flags)
 * @param flagKey - The feature flag key
 * @param distinctId - User ID
 * @returns true if enabled, false otherwise
 */
export async function isFeatureEnabled(
  flagKey: string,
  distinctId: string
): Promise<boolean> {
  const value = await getFeatureFlag(flagKey, distinctId)
  return value === true || (typeof value === 'string' && value !== 'false')
}
