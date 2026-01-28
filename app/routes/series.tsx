import type { Route } from "./+types/series";
import { Series } from "../pages/series";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Series" }];
}

export default function Page() {
  return <Series />;
}