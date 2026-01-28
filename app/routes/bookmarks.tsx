import type { Route } from "./+types/bookmarks";
import { Bookmarks } from "../pages/bookmarks";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Bookmarks" }];
}

export default function Page() {
  return <Bookmarks />;
}