import {useState} from "react";
import { useTheme } from "~/contexts/ThemeContext";
import Search from "../img/icon-search.svg";

export const SearchComponent = () => {
  const { isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={`${isDark ? 'bg-blue-950' : 'bg-white-100'} h-8 gap-x-8 flex items-center mt-0 lg:mt-8`}>
        <img src={Search} alt="Search" />
        <input id="search-input" className={`px-2 py-2 caret-red-500 text-[24px] cursor-pointer w-9/10 ${isDark ? 'text-white' : 'text-white'} ${isHovered ? 'border-b-2 border-blue-500' : 'border-b-2 border-transparent'}`} type="text" placeholder="Search for movies or TV series" />
    </div>
  )
}
