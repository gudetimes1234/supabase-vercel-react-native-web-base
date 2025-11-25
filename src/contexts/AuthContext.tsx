/**
 * Auth Context
 * Provides authentication state and methods throughout the app
 *
 * @example
 * // In your component
 * import { useAuth } from 'src/contexts/AuthContext';
 *
 * const MyComponent = () => {
 *   const { user, signIn, signOut, loading } = useAuth();
 *
 *   if (loading) return <Loading />;
 *   if (!user) return <LoginScreen />;
 *
 *   return <HomeScreen />;
 * };
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { Session } from '@supabase/supabase-js';
import { authService } from 'src/services/auth';
import { supabase } from 'src/services/supabase';
import {
  User,
  AuthContextType,
  SignInCredentials,
  SignUpCredentials,
  mapSupabaseUser,
} from 'src/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { session: currentSession } = await authService.getSession();
        setSession(currentSession);
        setUser(currentSession ? mapSupabaseUser(currentSession.user) : null);
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession ? mapSupabaseUser(newSession.user) : null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign in
  const signIn = useCallback(
    async (credentials: SignInCredentials): Promise<{ error: Error | null }> => {
      setLoading(true);
      try {
        const { error } = await authService.signIn(credentials);
        return { error };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Sign up
  const signUp = useCallback(
    async (credentials: SignUpCredentials): Promise<{ error: Error | null }> => {
      setLoading(true);
      try {
        const { error } = await authService.signUp(credentials);
        return { error };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Sign out
  const signOut = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      await authService.signOut();
      setUser(null);
      setSession(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset password
  const resetPassword = useCallback(
    async (email: string): Promise<{ error: Error | null }> => {
      try {
        return await authService.resetPassword(email);
      } catch (error) {
        return {
          error: error instanceof Error ? error : new Error('Password reset failed'),
        };
      }
    },
    []
  );

  // Update profile
  const updateProfile = useCallback(
    async (updates: Partial<User>): Promise<{ error: Error | null }> => {
      try {
        const { user: updatedUser, error } = await authService.updateProfile({
          fullName: updates.fullName,
          avatarUrl: updates.avatarUrl,
        });

        if (updatedUser && !error) {
          setUser(updatedUser);
        }

        return { error };
      } catch (error) {
        return {
          error: error instanceof Error ? error : new Error('Profile update failed'),
        };
      }
    },
    []
  );

  const value: AuthContextType = {
    user,
    session,
    loading,
    initialized,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
