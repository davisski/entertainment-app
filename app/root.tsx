import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatch,
} from "react-router";
import { useEffect, useRef, useState } from "react";
import { SearchComponent } from "./components/SearchComponent";

import type { Route } from "./+types/root";
import "./app.css";
import { useTheme } from "./contexts/ThemeContext";

import { AppProviders } from "./providers";
import { SidebarComponent } from "./components/SidebarComponent";
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
  const { isDark } = useTheme();
  const bodyRef = useRef<HTMLBodyElement>(null);
  const [justifyStart, setJustifyStart] = useState(false);
  const [sidebarShow, setSidebarShow] = useState(true);

  const tvRoute = useMatch("/tv-series");
  const movieRoute = useMatch("/movies");
  const bookmarksRoute = useMatch("/bookmarks");
  const accountRoute = useMatch("/account");

  const loginRoute = useMatch("/auth/login");
  const signupRoute = useMatch("/auth/signup");

  useEffect(() => {
    if (tvRoute || movieRoute || bookmarksRoute || accountRoute) {
      setJustifyStart(true);
    } else {
      setJustifyStart(false);
    }

    if(loginRoute || signupRoute) {
      setSidebarShow(false);
    }

  }, [tvRoute, movieRoute, bookmarksRoute, accountRoute, justifyStart]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body ref={bodyRef} className={`pt-8 max-w-360 ${justifyStart ? 'justify-start' : 'justify-end'} relative m-auto flex lg:flex-row flex-col  gap-x-9 pb-8 h-screen`}>
        { sidebarShow && (
          <SidebarComponent />
        )}
        <main className="flex flex-col max-w-360">
          <section className={`${isDark ? 'bg-blue-950' : 'bg-white-100'} min-w-355 ${justifyStart ? 'pl-32' : 'pl-42'} pt-9`}>
          <SearchComponent />
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
