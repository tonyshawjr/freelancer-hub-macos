import { SupabaseClient } from '@supabase/supabase-js';
import { DatabaseService, TableQuery } from './types';

export class SupabaseService implements DatabaseService {
  private client: SupabaseClient;
  private adminClient?: SupabaseClient;

  constructor(client: SupabaseClient, adminClient?: SupabaseClient) {
    this.client = client;
    this.adminClient = adminClient;
  }

  // Base methods
  from(table: string, useAdmin: boolean = false): TableQuery {
    return useAdmin && this.adminClient ? this.adminClient.from(table) : this.client.from(table);
  }

  async rpc(fn: string, params?: any, useAdmin: boolean = false) {
    return useAdmin && this.adminClient ? this.adminClient.rpc(fn, params) : this.client.rpc(fn, params);
  }

  // Auth methods
  async signIn(email: string, password: string) {
    return this.client.auth.signInWithPassword({ email, password });
  }

  async signOut() {
    return this.client.auth.signOut();
  }

  // Storage methods
  get storage() {
    return this.client.storage;
  }

  // Admin methods
  hasAdminAccess(): boolean {
    return !!this.adminClient;
  }

  getAdminClient(): SupabaseClient | undefined {
    return this.adminClient;
  }
}
