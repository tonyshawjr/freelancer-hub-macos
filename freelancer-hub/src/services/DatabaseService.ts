import { SupabaseClient } from '@supabase/supabase-js';

export interface DatabaseService {
  client: SupabaseClient;
  // Add other common database methods here
  // For example:
  // query: (table: string, params?: any) => Promise<any>;
  // insert: (table: string, data: any) => Promise<any>;
}
