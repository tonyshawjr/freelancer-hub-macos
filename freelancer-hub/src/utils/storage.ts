// Secure storage utilities for sensitive data
const STORAGE_PREFIX = 'fh_';

export enum StorageKey {
  DATABASE_PROVIDER = `${STORAGE_PREFIX}database_provider`,
  SUPABASE_URL = `${STORAGE_PREFIX}supabase_url`,
  SUPABASE_ANON_KEY = `${STORAGE_PREFIX}supabase_anon_key`,
  SUPABASE_SERVICE_ROLE_KEY = `${STORAGE_PREFIX}supabase_service_role_key`,
}

class SecureStorage {
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  set(key: StorageKey, value: string): void {
    const encryptedValue = btoa(value);
    this.storage.setItem(key, encryptedValue);
  }

  get(key: StorageKey): string | null {
    const encryptedValue = this.storage.getItem(key);
    if (!encryptedValue) return null;
    try {
      return atob(encryptedValue);
    } catch {
      return null;
    }
  }

  remove(key: StorageKey): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    Object.values(StorageKey).forEach(key => {
      this.storage.removeItem(key);
    });
  }
}

export const secureStorage = new SecureStorage();
