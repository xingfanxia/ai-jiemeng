/**
 * OpenTelemetry Logger for PostHog
 * Sends logs to PostHog via OTLP HTTP exporter
 */

import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { SimpleLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { logs, SeverityNumber, type AnyValueMap } from '@opentelemetry/api-logs';

let sdk: NodeSDK | null = null;

/**
 * Initialize the OpenTelemetry SDK for logging to PostHog
 * Should be called once at application startup
 */
export function initOtelLogger() {
  if (sdk) {
    console.warn('[OTel] Logger already initialized');
    return sdk;
  }

  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!apiKey) {
    console.warn('[OTel] NEXT_PUBLIC_POSTHOG_KEY not set, skipping OTel logger initialization');
    return null;
  }

  const logExporter = new OTLPLogExporter({
    url: 'https://us.i.posthog.com/v1/logs',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  sdk = new NodeSDK({
    resource: resourceFromAttributes({
      'service.name': 'ai-jiemeng',
      'service.version': process.env.npm_package_version || '1.0.0',
      'deployment.environment': process.env.NODE_ENV || 'development',
    }),
    logRecordProcessor: new SimpleLogRecordProcessor(logExporter),
  });

  sdk.start();
  console.log('[OTel] Logger initialized successfully');

  return sdk;
}

/**
 * Get the OpenTelemetry logger instance
 */
export function getOtelLogger() {
  return logs.getLogger('ai-jiemeng');
}

/**
 * Log an info message to PostHog
 */
export function logInfo(message: string, attributes?: AnyValueMap) {
  const logger = getOtelLogger();
  logger.emit({
    severityNumber: SeverityNumber.INFO,
    severityText: 'INFO',
    body: message,
    attributes,
  });
}

/**
 * Log a warning message to PostHog
 */
export function logWarning(message: string, attributes?: AnyValueMap) {
  const logger = getOtelLogger();
  logger.emit({
    severityNumber: SeverityNumber.WARN,
    severityText: 'WARN',
    body: message,
    attributes,
  });
}

/**
 * Log an error message to PostHog
 */
export function logError(message: string, error?: Error, attributes?: AnyValueMap) {
  const logger = getOtelLogger();
  logger.emit({
    severityNumber: SeverityNumber.ERROR,
    severityText: 'ERROR',
    body: message,
    attributes: {
      ...attributes,
      'exception.type': error?.name,
      'exception.message': error?.message,
      'exception.stacktrace': error?.stack,
    },
  });
}

/**
 * Shutdown the OpenTelemetry SDK gracefully
 */
export async function shutdownOtelLogger() {
  if (sdk) {
    await sdk.shutdown();
    sdk = null;
    console.log('[OTel] Logger shutdown complete');
  }
}

export { sdk };
