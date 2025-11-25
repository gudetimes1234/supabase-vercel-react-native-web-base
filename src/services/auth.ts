/**
 * Auth Service
 * Authentication functions using Supabase
 */

import { supabase } from './supabase';
import {
  SignInCredentials,
  SignUpCredentials,
  AuthResponse,
  mapSupabaseUser,
} from 'src/types/auth';

export const authService = {
  /**
   * Sign in with email and password
   */
  signIn: async (credentials: SignInCredentials): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        return { user: null, session: null, error };
      }

      return {
        user: mapSupabaseUser(data.user),
        session: data.session,
        error: null,
      };
    } catch (error) {
      return {
        user: null,
        session: null,
        error: error instanceof Error ? error : new Error('Sign in failed'),
      };
    }
  },

  /**
   * Sign up with email and password
   */
  signUp: async (credentials: SignUpCredentials): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            full_name: credentials.fullName,
          },
        },
      });

      if (error) {
        return { user: null, session: null, error };
      }

      return {
        user: mapSupabaseUser(data.user),
        session: data.session,
        error: null,
      };
    } catch (error) {
      return {
        user: null,
        session: null,
        error: error instanceof Error ? error : new Error('Sign up failed'),
      };
    }
  },

  /**
   * Sign out
   */
  signOut: async (): Promise<{ error: Error | null }> => {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      return {
        error: error instanceof Error ? error : new Error('Sign out failed'),
      };
    }
  },

  /**
   * Reset password
   */
  resetPassword: async (email: string): Promise<{ error: Error | null }> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      return { error };
    } catch (error) {
      return {
        error: error instanceof Error ? error : new Error('Password reset failed'),
      };
    }
  },

  /**
   * Get current session
   */
  getSession: async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      return { session: data.session, error };
    } catch (error) {
      return {
        session: null,
        error: error instanceof Error ? error : new Error('Failed to get session'),
      };
    }
  },

  /**
   * Get current user
   */
  getUser: async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      return { user: mapSupabaseUser(data.user), error };
    } catch (error) {
      return {
        user: null,
        error: error instanceof Error ? error : new Error('Failed to get user'),
      };
    }
  },

  /**
   * Update user profile
   */
  updateProfile: async (updates: { fullName?: string; avatarUrl?: string }) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          full_name: updates.fullName,
          avatar_url: updates.avatarUrl,
        },
      });

      if (error) {
        return { user: null, error };
      }

      return { user: mapSupabaseUser(data.user), error: null };
    } catch (error) {
      return {
        user: null,
        error: error instanceof Error ? error : new Error('Profile update failed'),
      };
    }
  },

  /**
   * Listen for auth state changes
   */
  onAuthStateChange: (callback: (event: string, session: unknown) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};

export default authService;
