import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface SearchContextType {
  filteredResults: any[];
  setFilteredResults: (results: any[]) => void;
}
const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
    const [filteredResults, setFilteredResults] = useState<any[]>([]);

    return (
        <SearchContext.Provider value={{ filteredResults, setFilteredResults }}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}

