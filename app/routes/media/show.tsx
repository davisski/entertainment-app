import type { Route } from "./+types/show";
import { Show } from "~/pages/media/show";

export async function clientLoader({
  params,
}: Route.ClientLoaderArgs) {
  const mediaType = params.mediaType == 'tv-series' ? 'tv' : 'movie';
  const details = await fetch(`https://api.themoviedb.org/3/${mediaType}/${params.mediaId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
  const detailsData = await details.json();

  const res = await fetch(`https://api.themoviedb.org/3/${mediaType}/${params.mediaId}/reviews?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
  const reviews = await res.json();
  return {
    reviews,
    details: detailsData
  };
}

export function meta({params}: Route.MetaArgs) {
  return [{ title: `Media ${params.mediaId}` }];
}

export default function Page({params, loaderData}: Route.ComponentProps) {
  return <Show mediaId={params.mediaId} media={params.mediaType || ''} reviews={loaderData.reviews} details={loaderData.details} />;
}