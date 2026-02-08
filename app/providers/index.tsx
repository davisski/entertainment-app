import type { ReactNode } from 'react';
import { ThemeProvider } from "../contexts/ThemeContext";
import { MoviesProvider } from "../contexts/MovieContext";
import { TrendingMoviesProvider } from "../contexts/TrendingMovieContext";
import { SeriesProvider } from "../contexts/SeriesContext";
import { BookmarkProvider } from "../contexts/BookmarkContext";
import { SearchProvider } from "../contexts/SearchContext";
import { MoviesGenreProvider } from "../contexts/MovieGenreContext";
import { SeriesGenreProvider } from "../contexts/SeriesGenreContext";


type Provider = ({ children }: { children: ReactNode }) => JSX.Element;

export function composeProviders(...providers: Provider[]) {
  return ({ children }: { children: ReactNode }) => {
    return providers.reduceRight((acc, Provider) => {
      return <Provider>{acc}</Provider>;
    }, children);
  };
}

export const AppProviders = composeProviders(
  ThemeProvider,
  TrendingMoviesProvider,
  MoviesProvider,
  SeriesProvider,
  BookmarkProvider,
  SearchProvider,
  MoviesGenreProvider,
  SeriesGenreProvider
);