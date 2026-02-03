import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

interface TrendingMoviesContextType {
  trendingMovies: any[];
  setTrendingMovies: (movies: any[]) => void;
  isLoading: boolean;
}

const TrendingMoviesContext = createContext<TrendingMoviesContextType | undefined>(undefined);

export function TrendingMoviesProvider({ children }: { children: ReactNode }) {
    const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
        
        const cachedData = getLocalStorage<any[]>('trendingMovies');
        if (cachedData) {
            setTrendingMovies(cachedData);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!isHydrated || !isLoading || trendingMovies.length > 0) return;

        const fetchTrendingMovies = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/trending/all/week?page=1&api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_KEY}`,
                        },
                    }
                );
                const data = await response.json();
                
                if (data.results) {
                    setTrendingMovies(data.results);
                
                    setLocalStorage('trendingMovies', data.results);
                }
            } catch (error) {
                console.error('Error fetching trending movies:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrendingMovies();
    }, [isHydrated, isLoading, trendingMovies.length]);

    return (
        <TrendingMoviesContext.Provider value={{ trendingMovies, setTrendingMovies, isLoading }}>
            {children}
        </TrendingMoviesContext.Provider>
    );
}

export function useTrendingMovies() {
  const context = useContext(TrendingMoviesContext);
  if (context === undefined) {
    throw new Error('useTrendingMovies must be used within a TrendingMoviesProvider');
  }
  return context;
}

