/**
 * Supabase Client
 * Configured Supabase client for the application
 */

import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { config } from 'src/constants/config';

const supabaseUrl = config.supabase.url;
const supabaseAnonKey = config.supabase.anonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: config.auth.autoRefreshToken,
    persistSession: config.auth.persistSession,
    detectSessionInUrl: config.auth.detectSessionInUrl,
  },
});

export default supabase;
