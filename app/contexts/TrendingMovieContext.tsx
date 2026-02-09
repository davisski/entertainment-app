import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import { Helpers } from '~/helpers';
interface TrendingMoviesContextType {
  trendingMovies: any[];
  setTrendingMovies: (movies: any[]) => void;
  isLoading: boolean;
  getTrendingMovie: (id: string) => any | undefined;
}

const TrendingMoviesContext = createContext<TrendingMoviesContextType | undefined>(undefined);

export function TrendingMoviesProvider({ children }: { children: ReactNode }) {
    const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isHydrated, setIsHydrated] = useState(false);
    const [fetchedForWeek, setFetchedForWeek] = useState<boolean>(false);

    useEffect(() => {
        setIsHydrated(true);

        const cachedData = getLocalStorage<{ timestamp: number; data: Array<any> }>('trendingMovies');
        
        if (cachedData && Helpers.isCurrentWeek(cachedData.timestamp)) {
            setTrendingMovies(cachedData.data);
            setIsLoading(false);
            setFetchedForWeek(true);
        }
    }, []);

    useEffect(() => {
        const monday = Helpers.isMonday();

        if (!isHydrated || !isLoading || !monday || fetchedForWeek) return;

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
                    const timestamp = Date.now();
                    setLocalStorage('trendingMovies', { timestamp, data: data.results });
                    setFetchedForWeek(true);
                }
            } catch (error) {
                console.error('Error fetching trending movies:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrendingMovies();
    }, [isHydrated, isLoading, fetchedForWeek]);

    const getTrendingMovie = (id: string) => trendingMovies.find(movie => movie.id === Number(id));

    return (
        <TrendingMoviesContext.Provider value={{ trendingMovies, setTrendingMovies, isLoading, getTrendingMovie }}>
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

