import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import Search from "./img/icon-search.svg";
import Logo from "./img/logo.svg";
import CategoryMovie from "./img/icon-nav-movies.svg";
import CategoryTV from "./img/icon-nav-tv-series.svg";
import Bookmark from "./img/icon-bookmark-empty.svg";
import HomeIcon from "./img/icon-nav-home.svg";
import Avatar from "./img/image-avatar.png";


import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="pt-8 m-auto pl-8 flex lg:flex-row flex-col gap-x-9 pb-8 h-screen">
        <div className="lg:d-none lg:pr-0 block pr-8">
          <div id="sidebar" className="lg:mb-0 mb-6 lg:w-24 w-full lg:rounded-[20px] lg:py-[33.7px] sm:py-[23.2px] md:py-[23.2px] bg-blue-900 
          rounded-[10px] lg:h-full h-18 flex lg:flex-col flex-row items-center justify-between lg:px-0 px-6">
            <div className="flex lg:flex-col w-full items-center">
              <img src={Logo} alt="Logo" className="lg:mb-6 mb-0 w-8"/>
              <ul className="m-0 flex lg:flex-col flex-row justify-center items-center lg:gap-y-10 gap-x-5 grow">
                <li className="text-white">
                  <Link to="/home">
                    <img className="w-5" src={HomeIcon} alt="Home" />
                  </Link>
                </li>
                <li className="text-white">
                  <Link to="/movies">
                    <img className="w-5" src={CategoryMovie} alt="Movies" />
                  </Link>
                </li>
                <li className="text-white">
                  <Link to="/tv-shows">
                    <img className="w-5"  src={CategoryTV} alt="TV Series" />
                  </Link>
                </li>
                <li className="text-white">
                  <Link to="/tv-shows">
                    <img className="w-5" src={Bookmark} alt="Bookmark" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Account */}
            <div className="">
              <Link to="/account">
                <img className="w-5 rounded-r-full" src={Avatar} alt="Account" />
              </Link>
            </div>
            {/* Account */}
          </div>
        </div>
        <main className="w-full flex flex-col gap-y-10">
          <div className="bg-blue-950 h-8 gap-x-8 flex items-center mt-0 lg:mt-8">
            <img src={Search} alt="Search" />
            <input id="search-input" className="opacity-50 py-1 w-9/10" type="text" placeholder="Search for movies or TV series" />
          </div>
          <section className="bg-blue-950 w-full">
            {children}
          </section>
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
