/**
 * Register Screen
 * Sign up with email and password
 */

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Card, Text, Input, Button } from 'src/components/ui';
import { useForm } from 'src/hooks/useForm';
import { useAuth } from 'src/contexts/AuthContext';
import { colors, spacing } from 'src/constants/theme';
import { ScreenProps } from 'src/types/navigation';

type Props = ScreenProps<'Register'>;

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { signUp, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm({
    fullName: {
      initialValue: '',
      validation: {
        required: true,
        minLength: 2,
        message: 'Please enter your name',
      },
    },
    email: {
      initialValue: '',
      validation: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email',
      },
    },
    password: {
      initialValue: '',
      validation: {
        required: true,
        minLength: 8,
        message: 'Password must be at least 8 characters',
      },
    },
    confirmPassword: {
      initialValue: '',
      validation: {
        required: true,
        custom: (value) => {
          if (value !== form.values.password) {
            return 'Passwords do not match';
          }
          return null;
        },
      },
    },
  });

  const handleRegister = async () => {
    setError(null);

    if (!form.validateForm()) {
      return;
    }

    const { error: signUpError } = await signUp({
      email: form.values.email,
      password: form.values.password,
      fullName: form.values.fullName,
    });

    if (signUpError) {
      setError(signUpError.message);
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
              We&apos;ve sent a confirmation link to {form.values.email}. Please
              check your email to verify your account.
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
    <Container scrollable centered>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="h1" align="center">
            Create Account
          </Text>
          <Text
            variant="body"
            color={colors.textSecondary}
            align="center"
            style={styles.subtitle}
          >
            Sign up to get started
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
            {...form.getFieldProps('fullName')}
            label="Full Name"
            placeholder="Enter your name"
            autoCapitalize="words"
          />

          <Input
            {...form.getFieldProps('email')}
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            {...form.getFieldProps('password')}
            label="Password"
            placeholder="Create a password"
            secureTextEntry
            hint="Must be at least 8 characters"
          />

          <Input
            {...form.getFieldProps('confirmPassword')}
            label="Confirm Password"
            placeholder="Confirm your password"
            secureTextEntry
          />

          <Button
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
            fullWidth
            style={styles.button}
          />
        </Card>

        <View style={styles.footer}>
          <Text variant="body" color={colors.textSecondary}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text variant="body" color={colors.primary}>
              Sign In
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
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  successText: {
    marginVertical: spacing.lg,
  },
});

export default RegisterScreen;
