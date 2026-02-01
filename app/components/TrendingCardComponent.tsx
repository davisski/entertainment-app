import { useState } from "react";
import { BookmarkComponent } from "~/components/BookmarkComponent";
import { CardInfoComponent } from "~/components/CardInfoComponent";
import largeThumbnail from "../img/thumbnails/large.jpg";
import { HoverComponent } from "./HoverComponent";

export const TrendingCardComponent = () => {
    const [mouseEnter, setMouseEnter] = useState(false);
    return (
      <div onMouseEnter={() => setMouseEnter(true)} onMouseLeave={() => setMouseEnter(false)} className="w-full relative rounded-xl min-w-117.5 p-6 max-w-117.5 min-h-57.5 max-h-57.5 h-full flex items-end justify-start bg-cover bg-center" style={{ backgroundImage: `url(${largeThumbnail})` }}>
          {mouseEnter && (
            <HoverComponent translate={{ x: 40, y: 50 }} top={50} left={40} />
          )}

        <BookmarkComponent />
        <div className="flex flex-col">
          <CardInfoComponent year="2019" category="Movie" contentCategory="PG" />
          <h3 className="text-white text-[24px]">Movie Title</h3>
        </div>
      </div>
    )
}
