import { DatabaseProvider } from '../services/database/types';

interface DatabaseConfig {
  provider: DatabaseProvider;
  supabase?: {
    url: string;
    anonKey: string;
    serviceRoleKey: string;
  };
  firebase?: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
  mysql?: {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    ssl: boolean;
  };
}

// Load database configuration from environment variables
export const getDatabaseConfig = (): DatabaseConfig => {
  const provider = process.env.REACT_APP_DATABASE_PROVIDER as DatabaseProvider;

  switch (provider) {
    case 'supabase':
      return {
        provider,
        supabase: {
          url: process.env.REACT_APP_SUPABASE_URL!,
          anonKey: process.env.REACT_APP_SUPABASE_ANON_KEY!,
          serviceRoleKey: process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY!,
        },
      };

    case 'firebase':
      return {
        provider,
        firebase: {
          apiKey: process.env.REACT_APP_FIREBASE_API_KEY!,
          authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN!,
          projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID!,
          storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET!,
          messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID!,
          appId: process.env.REACT_APP_FIREBASE_APP_ID!,
        },
      };

    case 'mysql':
      return {
        provider,
        mysql: {
          host: process.env.REACT_APP_MYSQL_HOST!,
          port: parseInt(process.env.REACT_APP_MYSQL_PORT || '3306'),
          database: process.env.REACT_APP_MYSQL_DATABASE!,
          username: process.env.REACT_APP_MYSQL_USERNAME!,
          password: process.env.REACT_APP_MYSQL_PASSWORD!,
          ssl: process.env.REACT_APP_MYSQL_SSL === 'true',
        },
      };

    default:
      throw new Error(`Unsupported database provider: ${provider}`);
  }
};
