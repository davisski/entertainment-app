import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';


interface SeriesContextType {
  series: any[];
  setSeries: (series: any[]) => void;
  isLoading: boolean;
}
const SeriesContext = createContext<SeriesContextType | undefined>(undefined);

export function SeriesProvider({ children }: { children: ReactNode }) {
    const [series, setSeries] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);

        const cachedData = getLocalStorage<any[]>('series');
        if (cachedData) {
            setSeries(cachedData);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!isHydrated || !isLoading || series.length > 0) return;

        const fetchSeries = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/trending/tv/week?page=1&api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_KEY}`,
                        },
                    }
                );
                const data = await response.json();
                
                if (data.results) {
                    setSeries(data.results);
                    setLocalStorage('series', data.results);
                }
            } catch (error) {
                console.error('Error fetching series:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSeries();
    }, [isHydrated, isLoading, series.length]);
    return (
        <SeriesContext.Provider value={{ series, setSeries, isLoading }}>
            {children}
        </SeriesContext.Provider>
    );
}

export function useSeries() {
  const context = useContext(SeriesContext);
  if (context === undefined) {
    throw new Error('useSeries must be used within a SeriesProvider');
  }
  return context;
}

