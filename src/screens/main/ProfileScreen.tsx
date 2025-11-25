/**
 * Profile Screen
 * View and edit user profile
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Card, Text, Input, Button } from 'src/components/ui';
import { useForm } from 'src/hooks/useForm';
import { useAuth } from 'src/contexts/AuthContext';
import { colors, spacing } from 'src/constants/theme';
import { ScreenProps } from 'src/types/navigation';

type Props = ScreenProps<'Profile'>;

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm({
    fullName: {
      initialValue: user?.fullName || '',
      validation: {
        required: true,
        minLength: 2,
        message: 'Please enter your name',
      },
    },
  });

  const handleUpdateProfile = async () => {
    setError(null);
    setSuccess(false);

    if (!form.validateForm()) {
      return;
    }

    setLoading(true);

    const { error: updateError } = await updateProfile({
      fullName: form.values.fullName,
    });

    setLoading(false);

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <Container scrollable>
      <View style={styles.header}>
        <Text variant="h1">Profile</Text>
        <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
          Manage your account information
        </Text>
      </View>

      <Card padding="lg" style={styles.card}>
        <View style={styles.infoRow}>
          <Text variant="label" color={colors.textSecondary}>
            Email
          </Text>
          <Text variant="body">{user?.email}</Text>
        </View>

        <View style={styles.divider} />

        {error && (
          <View style={styles.errorContainer}>
            <Text variant="bodySmall" color={colors.error}>
              {error}
            </Text>
          </View>
        )}

        {success && (
          <View style={styles.successContainer}>
            <Text variant="bodySmall" color={colors.success}>
              Profile updated successfully!
            </Text>
          </View>
        )}

        <Input
          {...form.getFieldProps('fullName')}
          label="Full Name"
          placeholder="Enter your name"
          autoCapitalize="words"
        />

        <Button
          title="Update Profile"
          onPress={handleUpdateProfile}
          loading={loading}
          fullWidth
          disabled={!form.isDirty}
        />
      </Card>

      <Button
        title="Back to Home"
        onPress={() => navigation.navigate('Home')}
        variant="ghost"
        fullWidth
        style={styles.backButton}
      />
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
  infoRow: {
    marginBottom: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  errorContainer: {
    backgroundColor: colors.errorLight,
    padding: spacing.sm,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  successContainer: {
    backgroundColor: colors.successLight,
    padding: spacing.sm,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  backButton: {
    marginTop: spacing.sm,
  },
});

export default ProfileScreen;
