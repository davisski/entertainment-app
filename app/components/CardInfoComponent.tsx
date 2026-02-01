import dot from "../img/dot.svg";
import dotLight from "../img/dot-light.svg";
import tvIcon from "../img/icon-nav-tv-series.svg";
import navTv from "../img/icon-category-tv.svg";
import { useTheme } from "~/contexts/ThemeContext";

export const CardInfoComponent = ({year, category, contentCategory}: {year: string, category: string, contentCategory: string}) => {
    const { isDark } = useTheme();
    return (
    <div className="flex items-center gap-2">
        <span className={`${isDark ? 'text-white' : 'text-blue-500'} text-[13px] opacity-75`}>
        {year}
        </span>
        <img className="w-1 h-1" src={isDark ? dot : dotLight} alt="Divider" />
        <div className="flex items-center gap-2">
            <img className="w-3 h-3 mb-0.5" src={isDark ? tvIcon : navTv} alt={category} />
            <span className={`${isDark ? 'text-white' : 'text-blue-500'} text-[13px] opacity-75 ml-1`}>{category}</span>
        </div>
        <img className="w-1 h-1" src={isDark ? dot : dotLight} alt="Divider" />
        <span className={`${isDark ? 'text-white' : 'text-blue-500'} text-[13px] opacity-75`}>{contentCategory}</span>
    </div>
  )
}
