/**
 * useForm Hook
 * A powerful form handling hook with validation
 *
 * @example
 * const form = useForm({
 *   email: {
 *     initialValue: '',
 *     validation: {
 *       required: true,
 *       pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
 *       message: 'Please enter a valid email',
 *     },
 *   },
 *   password: {
 *     initialValue: '',
 *     validation: {
 *       required: true,
 *       minLength: 8,
 *     },
 *   },
 * });
 *
 * // In your component:
 * <Input {...form.getFieldProps('email')} label="Email" />
 * <Input {...form.getFieldProps('password')} label="Password" secureTextEntry />
 * <Button
 *   title="Submit"
 *   onPress={() => {
 *     if (form.validateForm()) {
 *       // Submit form.values
 *     }
 *   }}
 *   disabled={!form.isValid}
 * />
 */

import { useState, useCallback, useMemo } from 'react';
import { FormConfig, FieldState, UseFormReturn, ValidationRule } from 'src/types/forms';

const validateField = (value: string, rules?: ValidationRule): string | null => {
  if (!rules) return null;

  // Required check
  if (rules.required && !value.trim()) {
    return rules.message || 'This field is required';
  }

  // Skip other validations if empty and not required
  if (!value.trim()) return null;

  // Min length check
  if (rules.minLength && value.length < rules.minLength) {
    return rules.message || `Must be at least ${rules.minLength} characters`;
  }

  // Max length check
  if (rules.maxLength && value.length > rules.maxLength) {
    return rules.message || `Must be no more than ${rules.maxLength} characters`;
  }

  // Pattern check
  if (rules.pattern && !rules.pattern.test(value)) {
    return rules.message || 'Invalid format';
  }

  // Custom validation
  if (rules.custom) {
    const customError = rules.custom(value);
    if (customError) return customError;
  }

  return null;
};

export function useForm<T extends string>(
  config: FormConfig<T>
): UseFormReturn<T> {
  // Initialize form state from config
  const initialState = useMemo(() => {
    const state: Record<string, FieldState> = {};
    for (const key in config) {
      state[key] = {
        value: config[key].initialValue,
        error: null,
        touched: false,
      };
    }
    return state as Record<T, FieldState>;
  }, []);

  const [formState, setFormState] = useState<Record<T, FieldState>>(initialState);

  // Get current values
  const values = useMemo(() => {
    const result: Record<string, string> = {};
    for (const key in formState) {
      result[key] = formState[key].value;
    }
    return result as Record<T, string>;
  }, [formState]);

  // Get current errors
  const errors = useMemo(() => {
    const result: Record<string, string | null> = {};
    for (const key in formState) {
      result[key] = formState[key].error;
    }
    return result as Record<T, string | null>;
  }, [formState]);

  // Get touched state
  const touched = useMemo(() => {
    const result: Record<string, boolean> = {};
    for (const key in formState) {
      result[key] = formState[key].touched;
    }
    return result as Record<T, boolean>;
  }, [formState]);

  // Check if form is valid (no errors)
  const isValid = useMemo(() => {
    return Object.values(formState).every(
      (field) => !(field as FieldState).error
    );
  }, [formState]);

  // Check if form has been modified
  const isDirty = useMemo(() => {
    for (const key in formState) {
      if (formState[key].value !== config[key].initialValue) {
        return true;
      }
    }
    return false;
  }, [formState, config]);

  // Set field value
  const setValue = useCallback((field: T, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
        // Clear error when user starts typing
        error: null,
      },
    }));
  }, []);

  // Set field error
  const setError = useCallback((field: T, error: string | null) => {
    setFormState((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        error,
      },
    }));
  }, []);

  // Set field touched state
  const setTouched = useCallback((field: T, isTouched = true) => {
    setFormState((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        touched: isTouched,
      },
    }));
  }, []);

  // Validate a single field
  const validateSingleField = useCallback(
    (field: T): boolean => {
      const value = formState[field].value;
      const rules = config[field].validation;
      const error = validateField(value, rules);

      setFormState((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          error,
          touched: true,
        },
      }));

      return error === null;
    },
    [formState, config]
  );

  // Validate entire form
  const validateForm = useCallback((): boolean => {
    let isValid = true;
    const newState = { ...formState };

    for (const key in config) {
      const value = formState[key].value;
      const rules = config[key].validation;
      const error = validateField(value, rules);

      newState[key] = {
        ...newState[key],
        error,
        touched: true,
      };

      if (error) {
        isValid = false;
      }
    }

    setFormState(newState);
    return isValid;
  }, [formState, config]);

  // Reset entire form
  const resetForm = useCallback(() => {
    const newState: Record<string, FieldState> = {};
    for (const key in config) {
      newState[key] = {
        value: config[key].initialValue,
        error: null,
        touched: false,
      };
    }
    setFormState(newState as Record<T, FieldState>);
  }, [config]);

  // Reset single field
  const resetField = useCallback(
    (field: T) => {
      setFormState((prev) => ({
        ...prev,
        [field]: {
          value: config[field].initialValue,
          error: null,
          touched: false,
        },
      }));
    },
    [config]
  );

  // Get field props for easy binding to Input component
  const getFieldProps = useCallback(
    (field: T) => ({
      value: formState[field].value,
      onChangeText: (text: string) => setValue(field, text),
      onBlur: () => {
        setTouched(field, true);
        validateSingleField(field);
      },
      error: formState[field].touched ? formState[field].error : null,
    }),
    [formState, setValue, setTouched, validateSingleField]
  );

  return {
    values,
    errors,
    touched,
    setValue,
    setError,
    setTouched,
    validateField: validateSingleField,
    validateForm,
    resetForm,
    resetField,
    isValid,
    isDirty,
    getFieldProps,
  };
}

export default useForm;
