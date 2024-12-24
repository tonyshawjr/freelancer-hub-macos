export type DatabaseProvider = 'supabase' | 'firebase' | 'mysql';

export interface QueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  where?: {
    field: string;
    operator: '==' | '!=' | '>' | '<' | '>=' | '<=';
    value: any;
  }[];
}

export interface DatabaseRecord {
  id: string;
  [key: string]: any;
}

export interface TableQuery {
  select: (columns?: string) => Promise<{ data: any[]; error: any }>;
  insert: (data: any) => Promise<{ data: any; error: any }>;
  update: (data: any) => TableQuery;
  delete: () => Promise<{ data: any; error: any }>;
  eq: (column: string, value: any) => TableQuery;
  neq: (column: string, value: any) => TableQuery;
  gt: (column: string, value: any) => TableQuery;
  lt: (column: string, value: any) => TableQuery;
  gte: (column: string, value: any) => TableQuery;
  lte: (column: string, value: any) => TableQuery;
  order: (column: string, options?: { ascending?: boolean }) => TableQuery;
  limit: (count: number) => TableQuery;
}

export interface StorageBucket {
  upload: (path: string, file: File) => Promise<{ data: any; error: any }>;
  getPublicUrl: (path: string) => { data: { publicUrl: string } };
  remove: (paths: string[]) => Promise<{ data: any; error: any }>;
}

export interface DatabaseService {
  // Base methods
  from: (table: string) => TableQuery;
  rpc: (fn: string, params?: any) => Promise<any>;
  
  // Auth methods
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  
  // Storage methods
  storage: {
    from: (bucket: string) => StorageBucket;
  };
  
  // Basic CRUD operations
  create: <T extends DatabaseRecord>(table: string, data: Partial<T>) => Promise<T>;
  read: <T extends DatabaseRecord>(table: string, id: string) => Promise<T | null>;
  update: <T extends DatabaseRecord>(table: string, id: string, data: Partial<T>) => Promise<T>;
  delete: (table: string, id: string) => Promise<void>;
  
  // Query operations
  query: <T extends DatabaseRecord>(
    table: string,
    options?: QueryOptions
  ) => Promise<T[]>;
  
  // Batch operations
  batchCreate: <T extends DatabaseRecord>(table: string, records: Partial<T>[]) => Promise<T[]>;
  batchUpdate: <T extends DatabaseRecord>(
    table: string,
    records: { id: string; data: Partial<T> }[]
  ) => Promise<T[]>;
  batchDelete: (table: string, ids: string[]) => Promise<void>;
  
  // Real-time subscriptions
  subscribe: <T extends DatabaseRecord>(
    table: string,
    callback: (data: T) => void,
    options?: QueryOptions
  ) => () => void;
}
