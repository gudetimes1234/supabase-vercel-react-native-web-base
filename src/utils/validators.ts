/**
 * Validation Utilities
 * Common validators for form fields
 */

export const validators = {
  /**
   * Check if value is not empty
   */
  required: (value: string, message = 'This field is required'): string | null => {
    return value.trim().length > 0 ? null : message;
  },

  /**
   * Check minimum length
   */
  minLength: (
    value: string,
    min: number,
    message?: string
  ): string | null => {
    if (value.trim().length < min) {
      return message || `Must be at least ${min} characters`;
    }
    return null;
  },

  /**
   * Check maximum length
   */
  maxLength: (
    value: string,
    max: number,
    message?: string
  ): string | null => {
    if (value.trim().length > max) {
      return message || `Must be no more than ${max} characters`;
    }
    return null;
  },

  /**
   * Validate email format
   */
  email: (value: string, message = 'Please enter a valid email'): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.trim()) ? null : message;
  },

  /**
   * Validate password strength
   */
  password: (
    value: string,
    options: {
      minLength?: number;
      requireUppercase?: boolean;
      requireLowercase?: boolean;
      requireNumber?: boolean;
      requireSpecial?: boolean;
    } = {}
  ): string | null => {
    const {
      minLength = 8,
      requireUppercase = true,
      requireLowercase = true,
      requireNumber = true,
      requireSpecial = false,
    } = options;

    if (value.length < minLength) {
      return `Password must be at least ${minLength} characters`;
    }

    if (requireUppercase && !/[A-Z]/.test(value)) {
      return 'Password must contain an uppercase letter';
    }

    if (requireLowercase && !/[a-z]/.test(value)) {
      return 'Password must contain a lowercase letter';
    }

    if (requireNumber && !/[0-9]/.test(value)) {
      return 'Password must contain a number';
    }

    if (requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return 'Password must contain a special character';
    }

    return null;
  },

  /**
   * Validate phone number
   */
  phone: (value: string, message = 'Please enter a valid phone number'): string | null => {
    const phoneRegex = /^[\d\s\-+()]{10,}$/;
    return phoneRegex.test(value.trim()) ? null : message;
  },

  /**
   * Validate URL
   */
  url: (value: string, message = 'Please enter a valid URL'): string | null => {
    try {
      new URL(value);
      return null;
    } catch {
      return message;
    }
  },

  /**
   * Check if values match (useful for confirm password)
   */
  matches: (
    value: string,
    compareValue: string,
    message = 'Values do not match'
  ): string | null => {
    return value === compareValue ? null : message;
  },

  /**
   * Validate against a regex pattern
   */
  pattern: (
    value: string,
    regex: RegExp,
    message = 'Invalid format'
  ): string | null => {
    return regex.test(value) ? null : message;
  },

  /**
   * Compose multiple validators
   */
  compose: (
    value: string,
    ...validatorFns: ((value: string) => string | null)[]
  ): string | null => {
    for (const validate of validatorFns) {
      const error = validate(value);
      if (error) return error;
    }
    return null;
  },
};

export default validators;
