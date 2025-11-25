/**
 * App Configuration
 * Centralized configuration for the application
 */

// Environment variables with fallbacks
export const config = {
  // Supabase
  supabase: {
    url: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
  },

  // App
  app: {
    name: process.env.EXPO_PUBLIC_APP_NAME || 'My App',
    env: process.env.EXPO_PUBLIC_APP_ENV || 'development',
    isDev: process.env.EXPO_PUBLIC_APP_ENV !== 'production',
    isProd: process.env.EXPO_PUBLIC_APP_ENV === 'production',
  },

  // API
  api: {
    timeout: 30000, // 30 seconds
    retries: 3,
  },

  // Auth
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },

  // Storage keys
  storageKeys: {
    authToken: '@app:auth_token',
    user: '@app:user',
    onboarding: '@app:onboarding_complete',
    theme: '@app:theme',
  },
};

// Validate required config
export const validateConfig = (): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!config.supabase.url) {
    errors.push('EXPO_PUBLIC_SUPABASE_URL is not configured');
  }

  if (!config.supabase.anonKey) {
    errors.push('EXPO_PUBLIC_SUPABASE_ANON_KEY is not configured');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export default config;
