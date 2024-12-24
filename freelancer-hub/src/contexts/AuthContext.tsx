import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { useDatabase } from '../contexts/DatabaseContext';
import { DatabaseService as TypesDatabaseService } from '../services/database/types';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const useAuthContext = () => {
  const { db, isConfigured } = useDatabase();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only attempt to get session if db is configured
    if (isConfigured && db) {
      // Type guard to check if db has a client property
      const isSupabaseService = (service: any): service is { client: any } => 
        service && typeof service === 'object' && 'client' in service;

      if (isSupabaseService(db)) {
        const supabaseClient = db.client;

        // Get initial session
        supabaseClient.auth.getSession().then(({ data }) => {
          setUser(data.session?.user ?? null);
          setLoading(false);
        });

        // Listen for auth changes
        const {
          data: { subscription },
        } = supabaseClient.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
          setUser(session?.user ?? null);
          setLoading(false);
        });

        return () => subscription.unsubscribe();
      }
    }

    setLoading(false);
  }, [db, isConfigured]);

  return { user, loading };
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuthContext();

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
