import { LinkComponent } from "./LinkComponent";
import CategoryMovie from "../img/icon-nav-movies.svg";
import CategoryTV from "../img/icon-nav-tv-series.svg";
import Bookmark from "../img/icon-bookmark-empty.svg";
import HomeIcon from "../img/icon-nav-home.svg";

import HomeActiveIcon from "../img/icon-nav-home-active.svg";
import HomeHoverIcon from "../img/icon-nav-home-hover.svg";
import CategoryMovieActive from "../img/icon-nav-movies-active.svg";
import CategoryTVActive from "../img/icon-nav-tv-series-active.svg";
import CategoryTVHover from "../img/icon-nav-tv-series-hover.svg";
import BookmarkActive from "../img/icon-nav-bookmark-active.svg";
import BookmarkHover from "../img/icon-nav-bookmark-hover.svg";
import CategoryMovieHover from "../img/icon-nav-movies-hover.svg";

export const NavigationComponent = () => {

  const linkConfigs = [
    { label: 'Home', to: "/", icons: { active: HomeActiveIcon, default: HomeIcon, hover: HomeHoverIcon } },
    { label: 'Movies', to: "/movies", icons: { active: CategoryMovieActive, default: CategoryMovie, hover: CategoryMovieHover } },
    { label: 'TV Series', to: "/tv-series", icons: { active: CategoryTVActive, default: CategoryTV, hover: CategoryTVHover } },
    { label: 'Bookmarks', to: "/bookmarks", icons: { active: BookmarkActive, default: Bookmark, hover: BookmarkHover } },
  ];

  return (
    <ul className="m-0 flex lg:flex-col flex-row justify-center items-center lg:gap-y-10 gap-x-5 grow">
        {linkConfigs.map(({ label, to, icons }) => (
            <li className="text-white" key={to}>
                <LinkComponent to={to} label={label} icons={icons} />
            </li>
        ))}
    </ul>
  )
}
