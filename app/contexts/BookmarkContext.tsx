import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getLocalStorage } from '../utils/localStorage';

interface BookmarkContextType {
  bookmarks: any[];
  setBookmarks: (bookmarks: any[]) => void;
  isLoading: boolean;
}
const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: ReactNode }) {
    const [bookmarks, setBookmarks] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);

        const cachedData = getLocalStorage<any[]>('bookmarks');
        if (cachedData) {
            setBookmarks(cachedData);
            setIsLoading(false);
        }
    }, []);
        
    return (
        <BookmarkContext.Provider value={{ bookmarks, setBookmarks, isLoading }}>
            {children}
        </BookmarkContext.Provider>
    );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}

