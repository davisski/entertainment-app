import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';


interface MoviesContextType {
  movies: any[];
  setMovies: (movies: any[]) => void;
  getMovie: (id: string) => any | undefined;
  isLoading: boolean;
}
const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

export function MoviesProvider({ children }: { children: ReactNode }) {
    const [movies, setMovies] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
        
        const cachedData = getLocalStorage<any[]>('movies');
        if (cachedData) {
            setMovies(cachedData);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!isHydrated || !isLoading || movies.length > 0) return;

        const fetchMovies = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/trending/movie/week?page=1&api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_KEY}`,
                        },
                    }
                );
                const data = await response.json();
                
                if (data.results) {
                    setMovies(data.results);
                    setLocalStorage('movies', data.results);
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [isHydrated, isLoading, movies.length]);

    const getMovie = (id: string) => movies.find(movie => movie.id === Number(id));
    return (
        <MoviesContext.Provider value={{ movies, setMovies, isLoading, getMovie }}>
            {children}
        </MoviesContext.Provider>
    );
}

export function useMovies() {
  const context = useContext(MoviesContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MoviesProvider');
  }
  return context;
}

