/**
 * Form Types
 */

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
  message?: string;
}

export interface FieldConfig {
  initialValue: string;
  validation?: ValidationRule;
}

export type FormConfig<T extends string> = Record<T, FieldConfig>;

export interface FieldState {
  value: string;
  error: string | null;
  touched: boolean;
}

export type FormState<T extends string> = Record<T, FieldState>;

export interface UseFormReturn<T extends string> {
  values: Record<T, string>;
  errors: Record<T, string | null>;
  touched: Record<T, boolean>;
  setValue: (field: T, value: string) => void;
  setError: (field: T, error: string | null) => void;
  setTouched: (field: T, touched?: boolean) => void;
  validateField: (field: T) => boolean;
  validateForm: () => boolean;
  resetForm: () => void;
  resetField: (field: T) => void;
  isValid: boolean;
  isDirty: boolean;
  getFieldProps: (field: T) => {
    value: string;
    onChangeText: (text: string) => void;
    onBlur: () => void;
    error: string | null;
  };
}
