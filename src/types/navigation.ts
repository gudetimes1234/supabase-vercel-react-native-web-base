/**
 * Navigation Types
 */

import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Root stack params
export type RootStackParamList = {
  // Auth screens
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;

  // Main screens
  Home: undefined;
  Profile: undefined;
  Settings: undefined;

  // Example flow screens
  // OnboardingStep1: undefined;
  // OnboardingStep2: undefined;
  // OnboardingComplete: undefined;
};

// Screen props helper type
export type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

// Navigation prop type
export type NavigationProp = ScreenProps<keyof RootStackParamList>['navigation'];

// Route prop type
export type RouteProp<T extends keyof RootStackParamList> = ScreenProps<T>['route'];

// Auth stack screens
export const AUTH_SCREENS: (keyof RootStackParamList)[] = [
  'Login',
  'Register',
  'ForgotPassword',
];

// Main stack screens (require auth)
export const MAIN_SCREENS: (keyof RootStackParamList)[] = [
  'Home',
  'Profile',
  'Settings',
];
