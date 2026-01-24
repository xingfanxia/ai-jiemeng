/**
 * Input Validation Utilities
 *
 * Security-focused validation for API inputs including:
 * - Length limits
 * - XSS prevention
 * - SQL injection pattern detection
 * - Dream content specific validation
 */

// Constants for validation limits
export const VALIDATION_LIMITS = {
  MAX_DREAM_CONTENT_LENGTH: 10000,
  MAX_TITLE_LENGTH: 200,
  MAX_CHAT_MESSAGE_LENGTH: 2000,
  MAX_CHAT_HISTORY_LENGTH: 30,
  MAX_REQUEST_BODY_SIZE: 100 * 1024, // 100KB
} as const;

// Common XSS patterns to strip
const XSS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi, // onclick=, onerror=, etc.
  /<iframe\b[^>]*>/gi,
  /<object\b[^>]*>/gi,
  /<embed\b[^>]*>/gi,
  /<link\b[^>]*>/gi,
];

// SQL injection patterns (for logging/alerting, not blocking)
const SQL_INJECTION_PATTERNS = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|TRUNCATE)\b.*\b(FROM|INTO|TABLE|SET|WHERE)\b)/gi,
  /(['"])\s*;\s*--/gi, // String termination followed by comment
  /\b(OR|AND)\s+['"]?\d+['"]?\s*=\s*['"]?\d+['"]?/gi, // OR 1=1 style
];

export interface ValidationResult {
  valid: boolean;
  sanitized?: string;
  error?: string;
  warnings?: string[];
}

/**
 * Sanitizes input by removing potentially dangerous patterns
 * @param input - Raw user input
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  let sanitized = input;

  // Remove XSS patterns
  for (const pattern of XSS_PATTERNS) {
    sanitized = sanitized.replace(pattern, '');
  }

  // Encode HTML entities for safety
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');

  return sanitized.trim();
}

/**
 * Checks for SQL injection patterns (for logging/alerting)
 * @param input - User input to check
 * @returns Array of detected patterns (empty if clean)
 */
export function detectSQLInjection(input: string): string[] {
  const detectedPatterns: string[] = [];

  for (const pattern of SQL_INJECTION_PATTERNS) {
    const matches = input.match(pattern);
    if (matches) {
      detectedPatterns.push(...matches);
    }
  }

  return detectedPatterns;
}

/**
 * Validates dream content
 * @param content - Dream content to validate
 * @returns Validation result with sanitized content or error
 */
export function validateDreamContent(content: unknown): ValidationResult {
  const warnings: string[] = [];

  // Type check
  if (typeof content !== 'string') {
    return { valid: false, error: '梦境内容必须是文字' };
  }

  // Empty check
  if (!content || content.trim().length === 0) {
    return { valid: false, error: '梦境内容不能为空' };
  }

  // Length check
  if (content.length > VALIDATION_LIMITS.MAX_DREAM_CONTENT_LENGTH) {
    return {
      valid: false,
      error: `梦境内容过长（最多${VALIDATION_LIMITS.MAX_DREAM_CONTENT_LENGTH}字）`
    };
  }

  // SQL injection detection (log warning but don't block)
  const sqlPatterns = detectSQLInjection(content);
  if (sqlPatterns.length > 0) {
    warnings.push(`检测到潜在SQL注入模式: ${sqlPatterns.length}`);
  }

  // Sanitize input
  const sanitized = sanitizeInput(content);

  return {
    valid: true,
    sanitized,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}

/**
 * Validates dream title
 * @param title - Dream title to validate
 * @returns Validation result
 */
export function validateDreamTitle(title: unknown): ValidationResult {
  // Title is optional
  if (title === null || title === undefined) {
    return { valid: true };
  }

  if (typeof title !== 'string') {
    return { valid: false, error: '梦境标题必须是文字' };
  }

  if (title.length > VALIDATION_LIMITS.MAX_TITLE_LENGTH) {
    return {
      valid: false,
      error: `梦境标题过长（最多${VALIDATION_LIMITS.MAX_TITLE_LENGTH}字）`
    };
  }

  const sanitized = sanitizeInput(title);

  return { valid: true, sanitized };
}

/**
 * Validates a chat message for AI interpretation
 * @param message - User message to validate
 * @returns Validation result with sanitized message or error
 */
export function validateChatMessage(message: unknown): ValidationResult {
  const warnings: string[] = [];

  // Type check
  if (typeof message !== 'string') {
    return { valid: false, error: '消息必须是文字' };
  }

  // Empty check
  if (!message || message.trim().length === 0) {
    return { valid: false, error: '消息不能为空' };
  }

  // Length check
  if (message.length > VALIDATION_LIMITS.MAX_CHAT_MESSAGE_LENGTH) {
    return {
      valid: false,
      error: `消息过长（最多${VALIDATION_LIMITS.MAX_CHAT_MESSAGE_LENGTH}字）`
    };
  }

  // SQL injection detection (log warning but don't block)
  const sqlPatterns = detectSQLInjection(message);
  if (sqlPatterns.length > 0) {
    warnings.push(`Potential SQL injection patterns detected: ${sqlPatterns.length}`);
  }

  // Sanitize input
  const sanitized = sanitizeInput(message);

  return {
    valid: true,
    sanitized,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}

/**
 * Validates chat history array
 * @param history - Chat history to validate
 * @returns Validation result
 */
export function validateChatHistory(history: unknown): ValidationResult {
  if (!Array.isArray(history)) {
    return { valid: false, error: '对话历史必须是数组' };
  }

  if (history.length > VALIDATION_LIMITS.MAX_CHAT_HISTORY_LENGTH) {
    return {
      valid: false,
      error: `对话历史过长（最多${VALIDATION_LIMITS.MAX_CHAT_HISTORY_LENGTH}条消息）`
    };
  }

  // Validate each message in history
  for (let i = 0; i < history.length; i++) {
    const msg = history[i];
    if (!msg || typeof msg !== 'object') {
      return { valid: false, error: `第${i + 1}条消息格式无效` };
    }
    if (!msg.role || !['user', 'assistant', 'system'].includes(msg.role)) {
      return { valid: false, error: `第${i + 1}条消息角色无效` };
    }
    if (typeof msg.content !== 'string') {
      return { valid: false, error: `第${i + 1}条消息内容无效` };
    }
    if (msg.content.length > VALIDATION_LIMITS.MAX_CHAT_MESSAGE_LENGTH) {
      return { valid: false, error: `第${i + 1}条消息过长` };
    }
  }

  return { valid: true };
}

/**
 * Validates dream type enum
 * @param dreamType - Dream type to validate
 * @returns Validation result
 */
export function validateDreamType(dreamType: unknown): ValidationResult {
  const validTypes = ['normal', 'nightmare', 'lucid', 'recurring', 'prenatal'];

  if (dreamType === null || dreamType === undefined) {
    return { valid: true }; // Optional field, defaults to 'normal'
  }

  if (typeof dreamType !== 'string') {
    return { valid: false, error: '梦境类型必须是文字' };
  }

  if (!validTypes.includes(dreamType)) {
    return { valid: false, error: `无效的梦境类型。必须是: ${validTypes.join(', ')}` };
  }

  return { valid: true };
}

/**
 * Validates fortune type enum
 * @param fortuneType - Fortune type to validate
 * @returns Validation result
 */
export function validateFortuneType(fortuneType: unknown): ValidationResult {
  const validTypes = ['大吉', '吉', '中平', '凶', '大凶'];

  if (fortuneType === null || fortuneType === undefined) {
    return { valid: true }; // Optional field
  }

  if (typeof fortuneType !== 'string') {
    return { valid: false, error: '运势类型必须是文字' };
  }

  if (!validTypes.includes(fortuneType)) {
    return { valid: false, error: `无效的运势类型。必须是: ${validTypes.join(', ')}` };
  }

  return { valid: true };
}

/**
 * Validates numeric range
 * @param value - Value to validate
 * @param min - Minimum value
 * @param max - Maximum value
 * @param fieldName - Field name for error message
 * @returns Validation result
 */
export function validateNumericRange(
  value: unknown,
  min: number,
  max: number,
  fieldName: string
): ValidationResult {
  if (value === null || value === undefined) {
    return { valid: true }; // Optional field
  }

  if (typeof value !== 'number' || isNaN(value)) {
    return { valid: false, error: `${fieldName}必须是数字` };
  }

  if (value < min || value > max) {
    return { valid: false, error: `${fieldName}必须在${min}-${max}之间` };
  }

  return { valid: true };
}

/**
 * Creates a standardized error response
 * @param message - Error message
 * @param status - HTTP status code
 * @returns Response object
 */
export function createErrorResponse(message: string, status: number): Response {
  return new Response(
    JSON.stringify({ success: false, error: message }),
    {
      status,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
