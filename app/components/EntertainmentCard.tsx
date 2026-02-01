import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import dot from "../img/dot.svg";
import dotLight from "../img/dot-light.svg";
import bookmarkOutline from "../img/bookmark-outline.svg";
import tvIcon from "../img/icon-nav-tv-series.svg";
import navTv from "../img/icon-category-tv.svg";
import mediumThumbnail from "../img/thumbnails/medium.jpg";
import playIcon from "../img/play-icon.svg";

export const EntertainmentCard = () => {
    const { isDark } = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={`h-57.5 justify-between rounded-lg max-w-70 flex flex-col items-center overflow-hidden relative`}>
            <div className="absolute w-8 h-8 z-10 rounded-full top-4 right-4 bg-blue-950 opacity-50 flex items-center justify-center">
                <img src={bookmarkOutline} alt="Bookmark" />
            </div>
    
            <div className="relative h-43.5 block w-full">
                <img src={mediumThumbnail} className="w-full z-10 h-43.5 block" alt="Thumbnail" />
                {
                    isHovered && (
                        <>
                            <div className="absolute w-full h-full z-20 top-0 left-0 bg-black opacity-50 flex items-center justify-center"></div>
                            <div className="absolute z-30 w-29.25 h-12 bg-white opacity-50 flex items-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] justify-evenly gap-4 rounded-full"></div>
                            <div className="translate-x-[-50%] translate-y-[-50%] absolute z-40 top-[50%] left-[46%] flex items-center gap-4">
                                <img className="h-7.5 w-7.5" src={playIcon} alt="Play" />
                                <span className="text-white">Play</span>
                            </div>
                        </>
                    )
                }
            </div>
            <div className="flex flex-col w-full">
                <div className="flex items-center gap-2">
                    <span className={`${isDark ? 'text-white' : 'text-blue-500'} text-[13px] opacity-75`}>
                    2019
                    </span>
                    <img className="w-1 h-1" src={isDark ? dot : dotLight} alt="Divider" />
                    <div className="flex items-center gap-2">
                        <img className="w-3 h-3 mb-0.5" src={isDark ? tvIcon : navTv} alt="TV series" />
                        <span className={`${isDark ? 'text-white' : 'text-blue-500'} text-[13px] opacity-75 ml-1`}>TV Series</span>
                    </div>
                    <img className="w-1 h-1" src={isDark ? dot : dotLight} alt="Divider" />
                    <span className={`${isDark ? 'text-white' : 'text-blue-500'} text-[13px] opacity-75`}>PG</span>
                </div>
                <h3 className={`text-lg ${isDark ? 'text-white' : 'text-blue-900'}`}>Movie Title</h3>
            </div>
        </div>
    )
}
