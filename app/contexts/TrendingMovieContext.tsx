import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface TrendingMoviesContextType {
  trendingMovies: any[];
  setTrendingMovies: (movies: any[]) => void;
}

const TrendingMoviesContext = createContext<TrendingMoviesContextType | undefined>(undefined);

export function TrendingMoviesProvider({ children }: { children: ReactNode }) {
    const [trendingMovies, setTrendingMovies] = useState<any[]>(() => {
        return typeof window !== 'undefined' && localStorage.getItem('trendingMovies')
            ? JSON.parse(localStorage.getItem('trendingMovies') || '[]')
            : [];
        });
    useEffect(() => {
        const trendingMoviesData = localStorage.getItem('trendingMovies');
        if (trendingMoviesData) {
            setTrendingMovies(JSON.parse(trendingMoviesData));
        }
    }, []);

    useEffect(() => {
        if (trendingMovies.length > 0) return;

        fetch(`https://api.themoviedb.org/3/trending/all/week?page=1&sort_by=popularity.desc&api_key=${import.meta.env.VITE_TMDB_API_KEY}`, {
            headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_KEY}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            data.results.forEach((movie: any) => {
                setTrendingMovies(prev => [...prev, movie]);
                localStorage.setItem('trendingMovies', JSON.stringify([...trendingMovies, movie]));
            });
        })
        .catch(error => console.error('Error fetching data:', error));
    }, [trendingMovies]);

    return (
        <TrendingMoviesContext.Provider value={{ trendingMovies, setTrendingMovies }}>
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

