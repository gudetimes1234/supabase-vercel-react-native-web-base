/**
 * Container Component
 * Layout wrapper with scrolling and safe area support
 *
 * @example
 * // Basic container
 * <Container>
 *   <Text>Content</Text>
 * </Container>
 *
 * @example
 * // Scrollable container with safe area
 * <Container scrollable safeArea>
 *   <Text>Long scrollable content...</Text>
 * </Container>
 *
 * @example
 * // Centered container without padding
 * <Container centered padding={false}>
 *   <Text>Centered content</Text>
 * </Container>
 */

import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from 'src/constants/theme';
import { ContainerProps } from 'src/types/components';

export const Container: React.FC<ContainerProps> = ({
  children,
  scrollable = false,
  padding = true,
  centered = false,
  safeArea = true,
  style,
  contentContainerStyle,
  keyboardAvoiding = true,
}) => {
  const contentStyle = [
    styles.content,
    padding && styles.padding,
    centered && styles.centered,
    style,
  ];

  const scrollContentStyle = [
    styles.scrollContent,
    padding && styles.padding,
    centered && styles.centered,
    contentContainerStyle,
  ];

  const renderContent = () => {
    if (scrollable) {
      return (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={scrollContentStyle}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      );
    }

    return <View style={contentStyle}>{children}</View>;
  };

  const renderWithKeyboardAvoiding = () => {
    if (keyboardAvoiding && Platform.OS !== 'web') {
      return (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          {renderContent()}
        </KeyboardAvoidingView>
      );
    }

    return renderContent();
  };

  if (safeArea) {
    return (
      <SafeAreaView style={styles.container}>
        {renderWithKeyboardAvoiding()}
      </SafeAreaView>
    );
  }

  return <View style={styles.container}>{renderWithKeyboardAvoiding()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  padding: {
    padding: spacing.md,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Container;
