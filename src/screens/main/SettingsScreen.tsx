/**
 * Settings Screen
 * App settings and preferences
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Card, Text, Button } from 'src/components/ui';
import { useAuth } from 'src/contexts/AuthContext';
import { colors, spacing } from 'src/constants/theme';
import { ScreenProps } from 'src/types/navigation';

type Props = ScreenProps<'Settings'>;

interface SettingsItemProps {
  title: string;
  description?: string;
  onPress?: () => void;
  showArrow?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  title,
  description,
  onPress,
  showArrow = true,
}) => (
  <TouchableOpacity
    style={styles.settingsItem}
    onPress={onPress}
    disabled={!onPress}
  >
    <View style={styles.settingsItemContent}>
      <Text variant="body">{title}</Text>
      {description && (
        <Text variant="bodySmall" color={colors.textSecondary}>
          {description}
        </Text>
      )}
    </View>
    {showArrow && onPress && (
      <Text variant="body" color={colors.textTertiary}>
        →
      </Text>
    )}
  </TouchableOpacity>
);

export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { signOut } = useAuth();

  return (
    <Container scrollable>
      <View style={styles.header}>
        <Text variant="h1">Settings</Text>
        <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
          Manage your app preferences
        </Text>
      </View>

      <Card padding="none" style={styles.card}>
        <View style={styles.section}>
          <Text variant="label" color={colors.textSecondary} style={styles.sectionTitle}>
            Account
          </Text>
          <SettingsItem
            title="Profile"
            description="Edit your profile information"
            onPress={() => navigation.navigate('Profile')}
          />
          <SettingsItem
            title="Change Password"
            description="Update your password"
            onPress={() => {/* TODO: Implement */}}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text variant="label" color={colors.textSecondary} style={styles.sectionTitle}>
            Preferences
          </Text>
          <SettingsItem
            title="Notifications"
            description="Manage notification settings"
            onPress={() => {/* TODO: Implement */}}
          />
          <SettingsItem
            title="Appearance"
            description="Theme and display options"
            onPress={() => {/* TODO: Implement */}}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text variant="label" color={colors.textSecondary} style={styles.sectionTitle}>
            About
          </Text>
          <SettingsItem
            title="Version"
            description="1.0.0"
            showArrow={false}
          />
          <SettingsItem
            title="Terms of Service"
            onPress={() => {/* TODO: Implement */}}
          />
          <SettingsItem
            title="Privacy Policy"
            onPress={() => {/* TODO: Implement */}}
          />
        </View>
      </Card>

      <View style={styles.actions}>
        <Button
          title="Sign Out"
          onPress={signOut}
          variant="danger"
          fullWidth
        />

        <Button
          title="Back to Home"
          onPress={() => navigation.navigate('Home')}
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
    overflow: 'hidden',
  },
  section: {
    padding: spacing.md,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  settingsItemContent: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  actions: {
    gap: spacing.sm,
  },
});

export default SettingsScreen;
