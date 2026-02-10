import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("movies", "routes/movies.tsx"),
    route("tv-series", "routes/series.tsx"),
    route("bookmarks", "routes/bookmarks.tsx"),
    route("account", "routes/account.tsx"),
    route(":mediaType/:mediaId", "routes/media/show.tsx"),
    ...prefix("auth", [
        route("login", "routes/auth/login.tsx"),
        route("signup", "routes/auth/signup.tsx"),
    ]),
    ...prefix("credit", [
        route(':creditId', "routes/credit/show.tsx")
    ]),
] satisfies RouteConfig;
