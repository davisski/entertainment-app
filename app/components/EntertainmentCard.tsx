import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { CardInfoComponent } from "./CardInfoComponent";
import { BookmarkComponent } from "./BookmarkComponent";
import playIcon from "../img/play-icon.svg";
import { Helpers } from "../helpers";
import { RatingCardComponent } from "./RatingCardComponent";

export const EntertainmentCard = ({id, title, release_date, media_type, poster_path, vote_average} : { id: number; title: string; release_date: string; media_type: string; poster_path: string; vote_average: number; }) => {
    const { isDark } = useTheme();
    const [isHovered, setIsHovered] = useState(false);

    let cardTitle = Helpers.truncateText(title, 25);
    return (
        <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={`h-57.5 justify-between rounded-lg max-w-70 flex flex-col items-center overflow-hidden relative`}>
            <BookmarkComponent id={id} />

            <div className="relative min-h-43.5 block w-full bg-cover bg-top" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${poster_path})` }}>
                {isHovered && ( 
                    <>
                        <div className="absolute w-full h-full z-20 top-0 left-0 bg-black opacity-50 flex items-center justify-center"></div>
                        <div className="absolute z-30 w-29.25 h-12 bg-white opacity-50 flex items-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] justify-evenly gap-4 rounded-full"></div>
                        <div className={`absolute z-40 top-[50%] left-[46%] translate-x-[-50%] translate-y-[-50%] flex items-center gap-4`}>
                            <img className="h-7.5 w-7.5" src={playIcon} alt="Play" />
                            <span className="text-white">Play</span>
                        </div>
                    </>
                )}
                <RatingCardComponent rating={vote_average} />
            </div>
            <div className="flex flex-col w-full">
                <CardInfoComponent year={release_date} category={media_type} contentCategory={''} />
                <h3 className={`text-lg ${isDark ? 'text-white' : 'text-blue-900'}`}>
                    {cardTitle}
                </h3>
            </div>
        </div>
    )
}
