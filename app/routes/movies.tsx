import type { Route } from "./+types/movies";
import { Movies } from "../pages/movies";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Movies" }];
}

export default function Page() {
  return <Movies />;
}