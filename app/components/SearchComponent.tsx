import { useEffect, useState, useRef} from "react";
import { useTheme } from "~/contexts/ThemeContext";
import Search from "../img/icon-search.svg";
import { useSearch } from "~/contexts/SearchContext";
import { useMatch } from "react-router";
import { useSeries } from "~/contexts/SeriesContext";
import { useMovies } from "~/contexts/MovieContext";
import { useBookmarks } from "~/contexts/BookmarkContext";

export const SearchComponent = () => {
  const { isDark } = useTheme();
  const [query, setQuery] = useState('');
  const [hidden, setHidden] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { setFilteredResults } = useSearch();
  const searchRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [searchActive, setSearchActive] = useState(false);
  const { series } = useSeries();
  const { movies } = useMovies();
  const { bookmarks } = useBookmarks();
  const tvRoute = useMatch("/tv-series");
  const movieRoute = useMatch("/movies");
  const bookmarksRoute = useMatch("/bookmarks");
  const accountRoute = useMatch("/account");

  useEffect(() => {
    const handleUserScroll = (e : Event) => {
      setScrollY(window.scrollY);

      if(scrollY >= (searchRef.current?.offsetHeight || 48)){
        setSearchActive(true);
      }else{
        setSearchActive(false);
      }

    }

    window.addEventListener('scroll', handleUserScroll); 

    return () => {
      window.removeEventListener('scroll', handleUserScroll);
    };
  }, [scrollY, searchActive]);

  useEffect(() => {
    setHidden(false);
    if(tvRoute){
      const filteredSeries = series.filter((show) =>
        show.name.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredResults(filteredSeries);
    }

    if(movieRoute){
      const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(filteredMovies);
    }

    if(bookmarksRoute){
      const combined = [...movies, ...series];
      const filteredCombined = combined.filter((item) => {
        const title = item.title || item.name || '';
        return title.toLowerCase().includes(query.toLowerCase()) && bookmarks.includes(item.id);
      });
      setFilteredResults(filteredCombined);
    }

    if(accountRoute){
      setHidden(true);
    }

  }, [tvRoute, movieRoute, accountRoute, hidden, bookmarksRoute, query]);


  return (
    <div ref={searchRef} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} 
    className={`${isDark ? 'bg-blue-950' : 'bg-white-100'}
    ${hidden ? 'hidden' : ''} flex items-center left-[11%] px-6 lg:px-0
    ${searchActive ? 'p-2 h-20 fixed transition-all z-999999 top-0 mt-0 w-full' : 'sticky h-12 lg:mt-8 w-10/12'}`}>
        <img className={`${searchActive ? 'pl-6' : ''}`} src={Search} alt="Search" />
        <input onInput={(e) => setQuery(e.currentTarget.value)} id="search-input" className={`px-2 py-2 caret-red-500 text-[24px] cursor-pointer w-9/10 
          ${isDark ? 'text-white' : 'text-white'} 
          ${isHovered ? 'border-b-2 border-blue-500' : 'border-b-2 border-transparent'}
          ${searchActive ? 'py-2' : ''}
          `} type="text" placeholder="Search for movies or TV series" />
    </div>
  )
}
