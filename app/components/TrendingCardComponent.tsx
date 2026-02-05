import { useState } from "react";
import { BookmarkComponent } from "~/components/BookmarkComponent";
import { CardInfoComponent } from "~/components/CardInfoComponent";
import playIcon from "../img/play-icon.svg";
import { Helpers } from "../helpers";
import { RatingCardComponent } from "./RatingCardComponent";
export const TrendingCardComponent = ({ movie }: { movie: any }) => {
    const [mouseEnter, setMouseEnter] = useState(false);

    let year, title = '';
    if(movie.hasOwnProperty('first_air_date')) {
      year = movie.first_air_date?.split("-")[0];
    }else if(movie.hasOwnProperty('release_date')) {
      year = movie.release_date?.split("-")[0];
    }

    if(movie.hasOwnProperty('name')) {
      title = movie.name;
    }else if(movie.hasOwnProperty('title')) {
      title = movie.title;
    }

    title = Helpers.truncateText(title, 30);

    return (
      <div onMouseEnter={() => setMouseEnter(true)} onMouseLeave={() => setMouseEnter(false)} className="w-full relative rounded-xl min-w-117.5 p-6 max-w-117.5 min-h-57.5 max-h-57.5 h-full flex items-end justify-start bg-cover bg-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})` }}>
          {mouseEnter && (
            <>
              <div className="absolute w-full h-full z-20 top-0 left-0 bg-black opacity-50 flex items-center justify-center"></div>
              <div className="absolute z-30 w-29.25 h-12 bg-white opacity-50 flex items-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] justify-evenly gap-4 rounded-full"></div>
              <div className={`absolute z-40 top-[50%] left-[48%] translate-x-[-50%] translate-y-[-50%] flex items-center gap-4`}>
                  <img className="h-7.5 w-7.5" src={playIcon} alt="Play" />
                  <span className="text-white">Play</span>
              </div>
            </>
         )}
        <RatingCardComponent rating={movie.vote_average} />
        <BookmarkComponent id={movie.id} />
        <div className="flex flex-col">
          <CardInfoComponent year={year} category={movie.media_type} contentCategory='-' />
          <h3 className="text-white text-[24px]">{title}</h3>
        </div>
      </div>
    )
}
