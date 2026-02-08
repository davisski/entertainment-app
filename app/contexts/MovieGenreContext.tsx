import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';


interface MovieGenreContextType {
  genres: any[];
  setGenres: (genres: any[]) => void;
  isLoading: boolean;
}
const MoviesGenreContext = createContext<MovieGenreContextType | undefined>(undefined);

export function MoviesGenreProvider({ children }: { children: ReactNode }) {
    const [genres, setGenres] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
        
        const cachedData = getLocalStorage<any[]>('movieGenres');
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
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_KEY}`,
                        },
                    }
                );
                const data = await response.json();

                if (data.genres) {
                    setGenres(data.genres);
                    setLocalStorage('movieGenres', data.genres);
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
        <MoviesGenreContext.Provider value={{ genres, setGenres, isLoading }}>
            {children}
        </MoviesGenreContext.Provider>
    );
}

export function useMovieGenres() {
  const context = useContext(MoviesGenreContext);
  if (context === undefined) {
    throw new Error('useMovieGenres must be used within a MoviesProvider');
  }
  return context;
}

