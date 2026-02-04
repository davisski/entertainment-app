import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("movies", "routes/movies.tsx"),
    route("tv-series", "routes/series.tsx"),
    route("bookmarks", "routes/bookmarks.tsx"),
    route("account", "routes/account.tsx"),
] satisfies RouteConfig;
