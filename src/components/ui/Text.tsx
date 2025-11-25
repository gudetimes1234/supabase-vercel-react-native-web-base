/**
 * Text Component
 * Typography component with predefined variants
 *
 * @example
 * // Heading
 * <Text variant="h1">Welcome</Text>
 *
 * @example
 * // Body text with custom color
 * <Text variant="body" color="#666">Description text</Text>
 *
 * @example
 * // Caption with center alignment
 * <Text variant="caption" align="center">Footer note</Text>
 */

import React from 'react';
import { Text as RNText, StyleSheet, TextStyle } from 'react-native';
import { colors, typography } from 'src/constants/theme';
import { TextProps, TextVariant } from 'src/types/components';

const getVariantStyle = (variant: TextVariant): TextStyle => {
  const variants: Record<TextVariant, TextStyle> = {
    h1: {
      fontSize: typography.fontSize.xxxl,
      fontWeight: typography.fontWeight.bold,
      lineHeight: typography.fontSize.xxxl * typography.lineHeight.tight,
    },
    h2: {
      fontSize: typography.fontSize.xxl,
      fontWeight: typography.fontWeight.bold,
      lineHeight: typography.fontSize.xxl * typography.lineHeight.tight,
    },
    h3: {
      fontSize: typography.fontSize.xl,
      fontWeight: typography.fontWeight.semibold,
      lineHeight: typography.fontSize.xl * typography.lineHeight.tight,
    },
    h4: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.semibold,
      lineHeight: typography.fontSize.lg * typography.lineHeight.normal,
    },
    body: {
      fontSize: typography.fontSize.md,
      fontWeight: typography.fontWeight.regular,
      lineHeight: typography.fontSize.md * typography.lineHeight.normal,
    },
    bodySmall: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.regular,
      lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
    },
    caption: {
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.regular,
      lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
    },
    label: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
    },
  };

  return variants[variant];
};

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  color = colors.text,
  align = 'left',
  style,
  numberOfLines,
}) => {
  const variantStyle = getVariantStyle(variant);

  return (
    <RNText
      style={[
        styles.base,
        variantStyle,
        { color, textAlign: align },
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    color: colors.text,
  },
});

export default Text;
