import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { useRef } from "react";
import Logo from "./img/logo.svg";

import Avatar from "./img/image-avatar.png";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { NavigationComponent } from "./components/NaviagtionComponent";
import { SearchComponent } from "./components/SearchComponent";
import { MoviesProvider } from "./contexts/MovieContext";
import { TrendingMoviesProvider } from "./contexts/TrendingMovieContext";
import { SeriesProvider } from "./contexts/SeriesContext";
import { BookmarkProvider } from "./contexts/BookmarkContext";
import { SearchProvider } from "./contexts/SearchContext";

import type { Route } from "./+types/root";
import "./app.css";

import { composeProviders } from "./providers";

const AppProviders = composeProviders(
  ThemeProvider,
  TrendingMoviesProvider,
  MoviesProvider,
  SeriesProvider,
  BookmarkProvider,
  SearchProvider
);

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

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isDark, toggleTheme } = useTheme();
  const bodyRef = useRef<HTMLBodyElement>(null);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body ref={bodyRef} className="pt-8 max-w-360 flex lg:flex-row flex-col justify-end gap-x-9 pb-8 h-screen">
        <div className="lg:d-none lg:pr-0 block pr-8">
          <div id="sidebar" className={`lg:mb-0 mb-6 fixed lg:w-24 w-full left-8 lg:rounded-[20px] lg:py-[33.7px] sm:py-[23.2px] md:py-[23.2px] z-10 rounded-[10px] lg:h-185 h-18 flex lg:flex-col flex-row items-center justify-between lg:px-0 px-6 ${isDark ? 'bg-blue-900' : 'bg-white-300'}`}>
            <div className="flex lg:flex-col w-full items-center">
              <img src={Logo} alt="Logo" className="lg:mb-6 mb-0 w-8"/>
              <NavigationComponent />              
            </div>

            {/* Account */}
            <div className="">

              {/* Theme switch */}
              <button className="text-white" onClick={toggleTheme}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
                >
                  <path
                    d="M12 4V2M12 22v-2M4 12H2m20 0h-2M4.22 4.22l-1.42-1.42M20.78 20.78l-1.42-1.42M4.22 19.78l-1.42 1.42M20.78 3.22l-1.42 1.42"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <Link  to="/account">
                <img className="w-10 h-10 border border-white rounded-full" src={Avatar} alt="Account" />
              </Link>
            </div>
            {/* Account */}
          </div>
        </div>
        <main className="flex flex-col max-w-360">
          <SearchComponent />
          <section className={`${isDark ? 'bg-blue-950' : 'bg-white-100'} w-full pl-42 pt-9`}>
            {children}
          </section>
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppProviders>
      <LayoutContent>{children}</LayoutContent>
    </AppProviders>
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
