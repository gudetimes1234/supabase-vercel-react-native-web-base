/**
 * Forgot Password Screen
 * Request password reset email
 */

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Card, Text, Input, Button } from 'src/components/ui';
import { useForm } from 'src/hooks/useForm';
import { useAuth } from 'src/contexts/AuthContext';
import { colors, spacing } from 'src/constants/theme';
import { ScreenProps } from 'src/types/navigation';

type Props = ScreenProps<'ForgotPassword'>;

export const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm({
    email: {
      initialValue: '',
      validation: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email',
      },
    },
  });

  const handleResetPassword = async () => {
    setError(null);

    if (!form.validateForm()) {
      return;
    }

    setLoading(true);

    const { error: resetError } = await resetPassword(form.values.email);

    setLoading(false);

    if (resetError) {
      setError(resetError.message);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <Container centered>
        <View style={styles.container}>
          <Card padding="lg" style={styles.card}>
            <Text variant="h2" align="center">
              Check Your Email
            </Text>
            <Text
              variant="body"
              color={colors.textSecondary}
              align="center"
              style={styles.successText}
            >
              We&apos;ve sent a password reset link to {form.values.email}. Please
              check your email to reset your password.
            </Text>
            <Button
              title="Back to Sign In"
              onPress={() => navigation.navigate('Login')}
              variant="outline"
              fullWidth
            />
          </Card>
        </View>
      </Container>
    );
  }

  return (
    <Container centered>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="h1" align="center">
            Reset Password
          </Text>
          <Text
            variant="body"
            color={colors.textSecondary}
            align="center"
            style={styles.subtitle}
          >
            Enter your email to receive a reset link
          </Text>
        </View>

        <Card padding="lg" style={styles.card}>
          {error && (
            <View style={styles.errorContainer}>
              <Text variant="bodySmall" color={colors.error}>
                {error}
              </Text>
            </View>
          )}

          <Input
            {...form.getFieldProps('email')}
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Button
            title="Send Reset Link"
            onPress={handleResetPassword}
            loading={loading}
            fullWidth
            style={styles.button}
          />
        </Card>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text variant="body" color={colors.primary}>
              Back to Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
    padding: spacing.md,
  },
  header: {
    marginBottom: spacing.xl,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  card: {
    width: '100%',
  },
  errorContainer: {
    backgroundColor: colors.errorLight,
    padding: spacing.sm,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  button: {
    marginTop: spacing.sm,
  },
  footer: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  successText: {
    marginVertical: spacing.lg,
  },
});

export default ForgotPasswordScreen;
