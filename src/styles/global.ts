/**
 * Global Styles
 * Reusable style patterns
 */

import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, shadows } from 'src/constants/theme';

export const globalStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Spacing
  padding: {
    padding: spacing.md,
  },
  paddingHorizontal: {
    paddingHorizontal: spacing.md,
  },
  paddingVertical: {
    paddingVertical: spacing.md,
  },
  margin: {
    margin: spacing.md,
  },
  marginHorizontal: {
    marginHorizontal: spacing.md,
  },
  marginVertical: {
    marginVertical: spacing.md,
  },

  // Cards and surfaces
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.md,
  },
  surface: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },

  // Dividers
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  dividerLight: {
    height: 1,
    backgroundColor: colors.gray[100],
    marginVertical: spacing.sm,
  },

  // Full width
  fullWidth: {
    width: '100%',
  },

  // Flex
  flex1: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },

  // Gap (for containers with multiple children)
  gapSm: {
    gap: spacing.sm,
  },
  gapMd: {
    gap: spacing.md,
  },
  gapLg: {
    gap: spacing.lg,
  },
});

export default globalStyles;
