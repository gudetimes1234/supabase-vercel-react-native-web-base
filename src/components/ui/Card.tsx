/**
 * Card Component
 * A flexible container with shadow and padding options
 *
 * @example
 * // Basic card
 * <Card>
 *   <Text>Card content</Text>
 * </Card>
 *
 * @example
 * // Card with large padding
 * <Card padding="lg">
 *   <Text variant="h2">Title</Text>
 *   <Text>Description goes here</Text>
 * </Card>
 *
 * @example
 * // Pressable card
 * <Card onPress={handlePress}>
 *   <Text>Tap me!</Text>
 * </Card>
 */

import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors, spacing, borderRadius, shadows } from 'src/constants/theme';
import { CardProps, CardPadding } from 'src/types/components';

const getPaddingStyle = (padding: CardPadding): ViewStyle => {
  const paddingMap: Record<CardPadding, ViewStyle> = {
    none: { padding: 0 },
    sm: { padding: spacing.sm },
    md: { padding: spacing.md },
    lg: { padding: spacing.lg },
  };

  return paddingMap[padding];
};

export const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  style,
  onPress,
  disabled = false,
}) => {
  const paddingStyle = getPaddingStyle(padding);

  const cardStyle = [
    styles.container,
    paddingStyle,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
        style={cardStyle}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
});

export default Card;
