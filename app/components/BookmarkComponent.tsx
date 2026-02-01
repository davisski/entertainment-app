import { useState } from "react";
import bookmarkOutline from "../img/bookmark-outline.svg";
import bookmarkFull from "../img/icon-bookmark-full.svg";
export const BookmarkComponent = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  return (
    <div className="absolute w-8 h-8 z-100 rounded-full top-4 right-4 bg-blue-950 opacity-50 flex items-center justify-center cursor-pointer" onClick={() => setIsBookmarked(!isBookmarked)}>
        <img src={isBookmarked ? bookmarkFull : bookmarkOutline} alt="Bookmark" />
    </div>
  )
}
