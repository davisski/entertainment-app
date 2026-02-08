import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';


interface SeriesGenreContextType {
  genres: any[];
  setGenres: (genres: any[]) => void;
  isLoading: boolean;
}
const SeriesGenreContext = createContext<SeriesGenreContextType | undefined>(undefined);

export function SeriesGenreProvider({ children }: { children: ReactNode }) {
    const [genres, setGenres] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);

        const cachedData = getLocalStorage<any[]>('seriesGenres');
        if (cachedData) {
            setGenres(cachedData);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!isHydrated || !isLoading || genres.length > 0) return;

        const fetchMovies = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/genre/tv/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_KEY}`,
                        },
                    }
                );
                const data = await response.json();

                if (data.genres) {
                    setGenres(data.genres);
                    setLocalStorage('seriesGenres', data.genres);
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [isHydrated, isLoading, genres.length]);
    return (
        <SeriesGenreContext.Provider value={{ genres, setGenres, isLoading }}>
            {children}
        </SeriesGenreContext.Provider>
    );
}

export function useSeriesGenres() {
  const context = useContext(SeriesGenreContext);
  if (context === undefined) {
    throw new Error('useSeriesGenres must be used within a SeriesGenreProvider');
  }
  return context;
}

