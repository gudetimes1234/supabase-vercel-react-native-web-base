/**
 * Login Screen
 * Sign in with email and password
 */

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Card, Text, Input, Button } from 'src/components/ui';
import { useForm } from 'src/hooks/useForm';
import { useAuth } from 'src/contexts/AuthContext';
import { colors, spacing } from 'src/constants/theme';
import { ScreenProps } from 'src/types/navigation';

type Props = ScreenProps<'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { signIn, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
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
        minLength: 6,
        message: 'Password must be at least 6 characters',
      },
    },
  });

  const handleLogin = async () => {
    setError(null);

    if (!form.validateForm()) {
      return;
    }

    const { error: signInError } = await signIn({
      email: form.values.email,
      password: form.values.password,
    });

    if (signInError) {
      setError(signInError.message);
    }
  };

  return (
    <Container scrollable centered>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="h1" align="center">
            Welcome Back
          </Text>
          <Text
            variant="body"
            color={colors.textSecondary}
            align="center"
            style={styles.subtitle}
          >
            Sign in to your account
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

          <Input
            {...form.getFieldProps('password')}
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgotPassword}
          >
            <Text variant="bodySmall" color={colors.primary}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            fullWidth
          />
        </Card>

        <View style={styles.footer}>
          <Text variant="body" color={colors.textSecondary}>
            Don&apos;t have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text variant="body" color={colors.primary}>
              Sign Up
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing.md,
    marginTop: -spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
});

export default LoginScreen;
