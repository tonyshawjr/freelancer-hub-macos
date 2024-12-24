# Solo.Studio: Freelance Management Platform

## Overview

Solo.Studio is a comprehensive freelance management application designed to empower
independent professionals by providing an all-in-one platform for managing business
operations. Built with modern web technologies, it offers a seamless, intuitive
experience for freelancers across various industries.

## Key Features

### Business Management

- Client Management: Centralized client information and interaction tracking
- Project Tracking: Comprehensive project lifecycle management
- Ticket System: Streamlined client communication and issue resolution
- Invoice Generation: Automated, professional invoicing
- Time Tracking: Precise billable hours tracking
- Client Portal: Secure client collaboration interface

### Technical Features

- Secure authentication and user management
- Multi-database support (currently Supabase)
- Responsive, modern UI with Material-UI
- Cross-platform desktop application using Tauri

## Technology Stack

### Frontend

- React + TypeScript
- Vite Build Tool
- Material-UI Component Library
- React Router for navigation
- Zustand for state management

### Backend & Infrastructure

- Flexible Database Provider Support
  - Supabase
  - Firebase
  - MySQL
- Dynamic Database Context
- Configurable authentication
- Seamless provider switching through Integrations settings

### Desktop Integration

- Tauri for native macOS application
- Cross-platform compatibility

## Project Structure

### Key Directories

- `src/`: Source code root
  - `routes.tsx`: Central routing configuration
  - `pages/`: Individual page components
  - `components/`: Reusable UI components
  - `contexts/`: Global state and context providers
  - `utils/`: Utility functions and helpers

### Routing Configuration

The application's routing is centrally managed in `src/routes.tsx`:

- Implements one-time login authentication
- Protects routes based on user authentication
- Provides seamless navigation experience
- Handles both authenticated and non-authenticated states

#### Routing Features

- Automatic redirection based on authentication status
- Protected routes wrapped in `ProtectedRoute` component
- Fallback handling for unknown routes
- Immediate dashboard access after login

## Security & Configuration

### Database Architecture

### Database Context Philosophy

**Single Source of Truth**:

- **ONLY** use `DatabaseContext` for all database interactions
- **DO NOT** create separate contexts for Supabase, Firebase, or any other database provider
- The `DatabaseContext` is designed to be **100% provider-agnostic and flexible**

### Provider Flexibility

- Easily switch between database providers without changing application logic
- Current supported providers:
  - Supabase
  - (Future) Firebase
  - (Future) MySQL
  - (Future) PostgreSQL

### Implementation Guidelines

- All database operations go through `DatabaseContext`
- Use `useDatabase()` hook for accessing database services
- Providers are dynamically configurable at runtime

#### Example Usage

```typescript
// Recommended way to access database
const { db, setProvider } = useDatabase();

// Switch providers dynamically
await setProvider('supabase', {
  url: 'your-supabase-url',
  anonKey: 'your-anon-key'
});
```

### Key Principles

- Centralized configuration
- Runtime provider switching
- Modular and extensible design
- Consistent interface across providers

**Warning**:

- Never create additional database-related contexts
- Always use `DatabaseContext` for database interactions

### Database Configuration

The application supports flexible database configuration:

- Secure storage of database credentials
- Support for multiple database providers
- Admin and client-level database access
- Configurable through the Integrations settings

### Database Context Architecture

- **Global Database Provider Abstraction**:
  - Unified interface for database operations
  - Supports multiple database providers
  - Runtime provider selection
  - Consistent API across different database backends
- **Flexible Configuration**:
  - Choose between Supabase, Firebase, or MySQL
  - Configure provider in Integrations settings
  - Seamless switching without code changes
- **Key Features**:
  - Dynamic client initialization
  - Secure credential management
  - Admin and standard client support
  - Extensible provider framework

### Database Context Architecture for Developers

#### Global Database Context Design

The application uses a sophisticated, flexible database context that allows
runtime selection and configuration of database providers. This design enables
seamless switching between different database backends without modifying
application code.

#### Key Architectural Components

1. **DatabaseContext**
   - Provides a global, centralized database management system
   - Exposes a unified interface for database operations
   - Supports dynamic provider initialization and switching

2. **Provider Initialization Mechanism**

```typescript
const initializeProvider = async (provider: Provider, config?: any) => {
  switch (provider) {
    case 'supabase':
      // Initialize Supabase client
      const supabase = createClient(url, anonKey);
      
      // Optional admin client for elevated permissions
      const adminClient = createClient(url, serviceRoleKey);
      
      // Create a service wrapper with both clients
      setDb(new SupabaseService(supabase, adminClient));
      break;
    // Future providers can be added here
  }
};
```

3. **Configuration Storage**
   - Uses `secureStorage` for storing database credentials
   - Supports multiple storage keys for different providers
   - Credentials are retrieved from:
     - Runtime configuration
     - Secure local storage
     - Environment variables

#### Developer Guide to Using the Database Context

##### 1. Accessing the Database in Components

```typescript
// In any component
const { db, isConfigured, provider, setProvider } = useDatabase();

// Perform database operations
const result = await db.from('table_name').select('*');
```

##### 2. Changing Database Providers

Providers can be changed dynamically through the Integrations settings:

```typescript
// Example of changing provider programmatically
await setProvider('firebase', {
  apiKey: '...',
  authDomain: '...'
});
```

#### Provider Configuration Workflow

1. Select provider in Integrations settings
2. Enter provider-specific credentials
3. Save configuration
4. Application automatically reinitializes database context

#### Security and Flexibility

- Credentials never hardcoded
- Supports multiple authentication levels
- Seamless provider switching
- Extensible architecture for future providers

#### Extending the Database Context

To add a new provider:

1. Create a new service implementing `DatabaseService` interface
2. Add provider initialization logic in `initializeProvider`
3. Update secure storage key management
4. Add provider-specific configuration in Integrations section

#### Best Practices

- Always use `useDatabase()` hook for database access
- Handle `isConfigured` state in components
- Use admin clients sparingly and securely
- Implement proper error handling for database operations

#### Potential Future Enhancements

- Connection pooling
- More granular permission management
- Additional provider support
- Enhanced credential encryption

### Authentication Philosophy

#### One-Time Platform Access Authentication

Solo.Studio implements a streamlined authentication model:

- **Initial Access Requirement**: Login is mandatory only when first accessing the platform
- **Single Authentication Session**: Once authenticated, the user has full access to all features
- **Persistent Session Management**:
  - Maintains user session across application restarts
  - Seamless re-entry without repeated login
  - Secure token-based authentication

#### Authentication Workflow

1. **First Launch**:
   - Presents login/signup screen
   - New users can create an account
   - Existing users sign in
2. **Successful Authentication**:
   - Immediate access to full application
   - No further login required during the session
3. **Session Persistence**:
   - Maintains user context
   - Automatically handles token refresh
   - Supports seamless user experience

#### Security Considerations

- Secure token management
- No repeated authentication for settings or features
- Background session validation
- Ability to manually logout if needed

#### Technical Implementation

```typescript
// Authentication state management
const { user, loading } = useAuth();

// Automatic session restoration
useEffect(() => {
  // Checks and restores existing session
  supabase.auth.getSession();
}, []);
```

#### Future Enhancements

- Two-factor authentication
- Biometric login options
- Advanced session management

## Installation

### Prerequisites

- Node.js (v18+)
- Rust (for Tauri)
- npm or yarn

### Setup Steps

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables
4. Run development server: `npm run dev`
5. Build desktop app: `npm run tauri build`

## Configuration

### Environment Variables

Create a `.env` file with the following:

- `REACT_APP_DATABASE_PROVIDER`: Database provider (e.g., 'supabase')
- `REACT_APP_SUPABASE_URL`: Supabase project URL
- `REACT_APP_SUPABASE_ANON_KEY`: Supabase anonymous key

### Database Migrations

Ensure database schema is up-to-date by running migrations through Supabase CLI.

## Roadmap & Future Development

- Enhanced integrations
- More database provider support
- Advanced reporting
- Improved client collaboration tools

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[Specify your license here]

## Support

For issues, feature requests, or support, please [create an issue](link-to-issues-page) on GitHub for Solo.Studio.

## Development Notes

- Always update this README when adding new features for Solo.Studio
- Maintain clear, concise documentation
- Follow existing code style and patterns
