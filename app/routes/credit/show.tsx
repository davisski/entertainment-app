


import type { Route } from "./+types/show";
import { Show } from "~/pages/credit/show";

export async function clientLoader({
  params,
}: Route.ClientLoaderArgs) {
  const details = await fetch(`https://api.themoviedb.org/3/credit/${params.creditId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
  const detailsData = await details.json();

  return detailsData;
}

export function meta({params}: Route.MetaArgs) {
  return [{ title: `Credit ${params.creditId}` }];
}

export default function Page({params, loaderData}: Route.ComponentProps) {
  return <Show creditId={params.creditId} details={loaderData} />;
}