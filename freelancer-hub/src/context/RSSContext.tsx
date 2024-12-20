import { createContext, useContext, ReactNode } from 'react';

interface RSSContextType {
  // Add your RSS types here
}

const RSSContext = createContext<RSSContextType | undefined>(undefined);

export function RSSProvider({ children }: { children: ReactNode }) {
  const value = {
    // Add your RSS data here
  };

  return (
    <RSSContext.Provider value={value}>
      {children}
    </RSSContext.Provider>
  );
}

export function useRSS() {
  const context = useContext(RSSContext);
  if (context === undefined) {
    throw new Error('useRSS must be used within a RSSProvider');
  }
  return context;
}
