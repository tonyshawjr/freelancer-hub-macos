import { createClient } from '@supabase/supabase-js';
import { secureStorage, StorageKey } from './storage';

export const getSupabaseConfig = () => {
  const supabaseUrl = secureStorage.get(StorageKey.SUPABASE_URL);
  const supabaseAnonKey = secureStorage.get(StorageKey.SUPABASE_ANON_KEY);

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase configuration not found. Please configure it in Settings.');
  }

  return {
    supabaseUrl,
    supabaseAnonKey,
  };
};

export const createSupabaseClient = () => {
  const config = getSupabaseConfig();
  return createClient(config.supabaseUrl, config.supabaseAnonKey);
};

// Test the Supabase connection
export const testSupabaseConnection = async (url: string, anonKey: string): Promise<{ success: boolean; message: string }> => {
  try {
    if (!url.startsWith('https://') || !url.endsWith('.supabase.co')) {
      return {
        success: false,
        message: 'Invalid Supabase URL. It should start with https:// and end with .supabase.co'
      };
    }

    if (!anonKey.startsWith('eyJ')) {
      return {
        success: false,
        message: 'Invalid anon key format. Make sure you are using the anon/public key, not the service_role key'
      };
    }

    console.log('Testing connection with:', { url });
    const testClient = createClient(url, anonKey);
    
    // Test connection by making a simple query
    const response = await fetch(`${url}/rest/v1/?apikey=${anonKey}`);
    if (!response.ok) {
      return {
        success: false,
        message: `Connection failed: HTTP ${response.status}. Please verify your credentials in the Supabase dashboard.`
      };
    }

    return {
      success: true,
      message: 'Successfully connected to Supabase! Your credentials are valid.'
    };
  } catch (error) {
    console.error('Supabase connection test error:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    
    // Check for common connection issues
    if (message.includes('Failed to fetch')) {
      return {
        success: false,
        message: 'Could not connect to Supabase. Please check your URL and make sure you have internet connectivity.'
      };
    }
    
    return {
      success: false,
      message
    };
  }
};
