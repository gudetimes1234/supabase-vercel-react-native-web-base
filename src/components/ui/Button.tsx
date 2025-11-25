/**
 * Button Component
 * A versatile button with multiple variants and states
 *
 * @example
 * // Primary button
 * <Button title="Submit" onPress={handleSubmit} />
 *
 * @example
 * // Secondary button with loading
 * <Button title="Save" variant="secondary" loading={isLoading} onPress={handleSave} />
 *
 * @example
 * // Outline button, full width
 * <Button title="Cancel" variant="outline" fullWidth onPress={handleCancel} />
 *
 * @example
 * // Danger button with icon
 * <Button title="Delete" variant="danger" leftIcon={<TrashIcon />} onPress={handleDelete} />
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from 'src/constants/theme';
import { ButtonProps, ButtonVariant, ButtonSize } from 'src/types/components';

const getVariantStyles = (
  variant: ButtonVariant,
  disabled: boolean
): { container: ViewStyle; text: TextStyle } => {
  const baseOpacity = disabled ? 0.5 : 1;

  const variants: Record<ButtonVariant, { container: ViewStyle; text: TextStyle }> = {
    primary: {
      container: {
        backgroundColor: colors.primary,
        opacity: baseOpacity,
      },
      text: {
        color: colors.white,
      },
    },
    secondary: {
      container: {
        backgroundColor: colors.secondary,
        opacity: baseOpacity,
      },
      text: {
        color: colors.white,
      },
    },
    outline: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary,
        opacity: baseOpacity,
      },
      text: {
        color: colors.primary,
      },
    },
    ghost: {
      container: {
        backgroundColor: 'transparent',
        opacity: baseOpacity,
      },
      text: {
        color: colors.primary,
      },
    },
    danger: {
      container: {
        backgroundColor: colors.error,
        opacity: baseOpacity,
      },
      text: {
        color: colors.white,
      },
    },
  };

  return variants[variant];
};

const getSizeStyles = (size: ButtonSize): { container: ViewStyle; text: TextStyle } => {
  const sizes: Record<ButtonSize, { container: ViewStyle; text: TextStyle }> = {
    sm: {
      container: {
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.sm,
      },
      text: {
        fontSize: typography.fontSize.sm,
      },
    },
    md: {
      container: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
      },
      text: {
        fontSize: typography.fontSize.md,
      },
    },
    lg: {
      container: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
      },
      text: {
        fontSize: typography.fontSize.lg,
      },
    },
  };

  return sizes[size];
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;
  const variantStyles = getVariantStyles(variant, isDisabled);
  const sizeStyles = getSizeStyles(size);

  const loadingColor = variant === 'outline' || variant === 'ghost'
    ? colors.primary
    : colors.white;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={[
        styles.container,
        variantStyles.container,
        sizeStyles.container,
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={loadingColor} size="small" />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <Text
            style={[
              styles.text,
              variantStyles.text,
              sizeStyles.text,
              textStyle,
            ]}
          >
            {title}
          </Text>
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  fullWidth: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'center',
  },
  leftIcon: {
    marginRight: spacing.xs,
  },
  rightIcon: {
    marginLeft: spacing.xs,
  },
});

export default Button;
