/**
 * Home Screen
 * Main landing screen after authentication
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Card, Text, Button } from 'src/components/ui';
import { useAuth } from 'src/contexts/AuthContext';
import { colors, spacing } from 'src/constants/theme';
import { ScreenProps } from 'src/types/navigation';

type Props = ScreenProps<'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { user, signOut } = useAuth();

  return (
    <Container scrollable>
      <View style={styles.header}>
        <Text variant="h1">Welcome{user?.fullName ? `, ${user.fullName}` : ''}!</Text>
        <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
          You&apos;re signed in as {user?.email}
        </Text>
      </View>

      <Card padding="lg" style={styles.card}>
        <Text variant="h3">Getting Started</Text>
        <Text variant="body" color={colors.textSecondary} style={styles.cardText}>
          This is your home screen. Start building your app from here!
        </Text>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Text variant="label" color={colors.primary}>
              UI Components
            </Text>
            <Text variant="bodySmall" color={colors.textSecondary}>
              Button, Input, Card, Container, Text
            </Text>
          </View>

          <View style={styles.feature}>
            <Text variant="label" color={colors.primary}>
              Authentication
            </Text>
            <Text variant="bodySmall" color={colors.textSecondary}>
              Login, Register, Forgot Password
            </Text>
          </View>

          <View style={styles.feature}>
            <Text variant="label" color={colors.primary}>
              Form Handling
            </Text>
            <Text variant="bodySmall" color={colors.textSecondary}>
              useForm hook with validation
            </Text>
          </View>

          <View style={styles.feature}>
            <Text variant="label" color={colors.primary}>
              Code Generation
            </Text>
            <Text variant="bodySmall" color={colors.textSecondary}>
              Screens, components, hooks, flows
            </Text>
          </View>
        </View>
      </Card>

      <View style={styles.actions}>
        <Button
          title="View Profile"
          onPress={() => navigation.navigate('Profile')}
          variant="outline"
          fullWidth
          style={styles.actionButton}
        />

        <Button
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
          variant="outline"
          fullWidth
          style={styles.actionButton}
        />

        <Button
          title="Sign Out"
          onPress={signOut}
          variant="ghost"
          fullWidth
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.lg,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  card: {
    marginBottom: spacing.lg,
  },
  cardText: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  features: {
    gap: spacing.md,
  },
  feature: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  actions: {
    gap: spacing.sm,
  },
  actionButton: {
    marginBottom: spacing.xs,
  },
});

export default HomeScreen;
