import bookmarkOutline from "../img/bookmark-outline.svg";
import bookmarkFull from "../img/icon-bookmark-full.svg";
import { useBookmarks } from "../contexts/BookmarkContext";
import { setLocalStorage } from "~/utils/localStorage";
import { useEffect } from "react";

export const BookmarkComponent = ({id} : {id: number}) => {
  const { bookmarks, setBookmarks } = useBookmarks();
  const isBookmarked = bookmarks.includes(id);

  const toggleBookmark = () => {
    if (isBookmarked) {
      setBookmarks(bookmarks.filter((bookmarkId) => bookmarkId !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  useEffect(() => {
    setLocalStorage('bookmarks', bookmarks);
  }, [bookmarks]);

  return (
    <div className="absolute w-8 h-8 z-100 rounded-full top-4 right-4 bg-blue-950 opacity-50 flex items-center justify-center cursor-pointer" 
    onClick={toggleBookmark}>
        <img src={isBookmarked ? bookmarkFull : bookmarkOutline} alt="Bookmark" />
    </div>
  )
}
