import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { CardInfoComponent } from "./CardInfoComponent";
import mediumThumbnail from "../img/thumbnails/medium.jpg";
import { BookmarkComponent } from "./BookmarkComponent";
import { HoverComponent } from "./HoverComponent";

export const EntertainmentCard = () => {
    const { isDark } = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={`h-57.5 justify-between rounded-lg max-w-70 flex flex-col items-center overflow-hidden relative`}>
            <BookmarkComponent />
    
            <div className="relative h-43.5 block w-full">
                <img src={mediumThumbnail} className="w-full z-10 h-43.5 block" alt="Thumbnail" />
                {isHovered && ( <HoverComponent small />)}
            </div>
            <div className="flex flex-col w-full">
                <CardInfoComponent year="2019" category="Movie" contentCategory="PG" />
                <h3 className={`text-lg ${isDark ? 'text-white' : 'text-blue-900'}`}>Movie Title</h3>
            </div>
        </div>
    )
}
