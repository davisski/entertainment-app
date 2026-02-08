import { useMovies } from "~/contexts/MovieContext";
import { useSeries } from "~/contexts/SeriesContext";

export function Show({media, mediaId}: {media: string; mediaId: string}) {
  if(media === 'movies') {
    const { getMovie } = useMovies();
    const movie = getMovie(mediaId);
    return (
      <div className="text-white">{movie?.title}</div>
    )
  }
  if(media === 'tv-series') {
    const { getSerie } = useSeries();
    const tvShow = getSerie(mediaId);
    return (
      <div className="text-white">{tvShow?.name}</div>
    )
  }
}
