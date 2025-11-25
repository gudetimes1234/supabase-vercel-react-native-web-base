/**
 * App Navigator
 * Main navigation configuration for the app
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import { useAuth } from 'src/contexts/AuthContext';
import { RootStackParamList } from 'src/types/navigation';
import { colors } from 'src/constants/theme';

// Auth Screens
import { LoginScreen, RegisterScreen, ForgotPasswordScreen } from 'src/screens/auth';

// Main Screens
import { HomeScreen, ProfileScreen, SettingsScreen } from 'src/screens/main';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Linking configuration for web deep links
const linking = {
  prefixes: ['myapp://', 'https://myapp.com'],
  config: {
    screens: {
      Login: 'login',
      Register: 'register',
      ForgotPassword: 'forgot-password',
      Home: '',
      Profile: 'profile',
      Settings: 'settings',
    },
  },
};

const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={colors.primary} />
  </View>
);

export const AppNavigator: React.FC = () => {
  const { user, loading, initialized } = useAuth();

  // Show loading screen while auth is initializing
  if (!initialized || loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      >
        {user ? (
          // Authenticated screens
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </>
        ) : (
          // Auth screens
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});

export default AppNavigator;
