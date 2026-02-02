import { useState } from "react";
import { BookmarkComponent } from "~/components/BookmarkComponent";
import { CardInfoComponent } from "~/components/CardInfoComponent";
import { HoverComponent } from "./HoverComponent";

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


    return (
      <div onMouseEnter={() => setMouseEnter(true)} onMouseLeave={() => setMouseEnter(false)} className="w-full relative rounded-xl min-w-117.5 p-6 max-w-117.5 min-h-57.5 max-h-57.5 h-full flex items-end justify-start bg-cover bg-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})` }}>
          {mouseEnter && (
            <HoverComponent translate={{ x: 40, y: 50 }} top={50} left={40} />
          )}

        <BookmarkComponent />
        <div className="flex flex-col">
          <CardInfoComponent year={year} category={movie.media_type} contentCategory='-' />
          <h3 className="text-white text-[24px]">{title}</h3>
        </div>
      </div>
    )
}
