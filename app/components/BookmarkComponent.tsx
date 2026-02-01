import bookmarkOutline from "../img/bookmark-outline.svg";
export const BookmarkComponent = () => {
  return (
    <div className="absolute w-8 h-8 z-10 rounded-full top-4 right-4 bg-blue-950 opacity-50 flex items-center justify-center">
        <img src={bookmarkOutline} alt="Bookmark" />
    </div>
  )
}
