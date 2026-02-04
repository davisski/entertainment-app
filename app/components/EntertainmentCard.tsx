import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { CardInfoComponent } from "./CardInfoComponent";
import { BookmarkComponent } from "./BookmarkComponent";
import { HoverComponent } from "./HoverComponent";

export const EntertainmentCard = ({ title, release_date, media_type, contentCategory, poster_path } : { title: string; release_date: string; media_type: string; contentCategory: string; poster_path: string; }) => {
    const { isDark } = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={`h-57.5 justify-between rounded-lg max-w-70 flex flex-col items-center overflow-hidden relative`}>
            <BookmarkComponent />
    
            <div className="relative min-h-43.5 block w-full bg-cover bg-top" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${poster_path})` }}>
                {isHovered && ( <HoverComponent small />)}
            </div>
            <div className="flex flex-col w-full">
                <CardInfoComponent year={release_date} category={media_type} contentCategory={contentCategory} />
                <h3 className={`text-lg ${isDark ? 'text-white' : 'text-blue-900'}`}>{title}</h3>
            </div>
        </div>
    )
}
