import React, { createContext, useContext, useEffect, useState } from 'react';
import { DatabaseService, DatabaseProvider as Provider } from '../services/database/types';
import { SupabaseService } from '../services/database/supabase';
import { createClient } from '@supabase/supabase-js';
import { secureStorage, StorageKey } from '../utils/storage';

interface DatabaseContextType {
  db: DatabaseService | null;
  isConfigured: boolean;
  provider: Provider | null;
  setProvider: (provider: Provider, config?: any) => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextType>({
  db: null,
  isConfigured: false,
  provider: null,
  setProvider: async () => {},
});

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [db, setDb] = useState<DatabaseService | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);
  const [provider, setProviderState] = useState<Provider | null>(null);

  const initializeProvider = async (provider: Provider, config?: any) => {
    try {
      switch (provider) {
        case 'supabase': {
          const url = config?.url || secureStorage.get(StorageKey.SUPABASE_URL);
          const anonKey = config?.anonKey || secureStorage.get(StorageKey.SUPABASE_ANON_KEY);
          const serviceRoleKey = config?.serviceRoleKey || secureStorage.get(StorageKey.SUPABASE_SERVICE_ROLE_KEY);
          
          if (!url || !anonKey) {
            throw new Error('Missing required Supabase configuration');
          }

          const supabase = createClient(url, anonKey, {
            auth: {
              persistSession: false
            }
          });

          // If we have a service role key, we can use it for admin operations
          if (serviceRoleKey) {
            const adminClient = createClient(url, serviceRoleKey, {
              auth: {
                persistSession: false,
                autoRefreshToken: false,
              }
            });
            setDb(new SupabaseService(supabase, adminClient));
          } else {
            setDb(new SupabaseService(supabase));
          }

          setIsConfigured(true);
          setProviderState(provider);
          break;
        }
        // Add other providers here
        default:
          throw new Error(`Unsupported provider: ${provider}`);
      }
    } catch (error) {
      console.error('Error initializing database provider:', error);
      throw error;
    }
  };

  useEffect(() => {
    const savedProvider = secureStorage.get(StorageKey.DATABASE_PROVIDER) as Provider;
    if (savedProvider) {
      initializeProvider(savedProvider).catch(console.error);
    }
  }, []);

  return (
    <DatabaseContext.Provider 
      value={{ 
        db, 
        isConfigured, 
        provider,
        setProvider: initializeProvider,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
