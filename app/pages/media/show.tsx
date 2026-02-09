import { useMovies } from "~/contexts/MovieContext";
import { useSeries } from "~/contexts/SeriesContext";
import { useTrendingMovies } from "~/contexts/TrendingMovieContext";
import { MediaShowComponent } from "~/components/MediaShowComponent";

export function Show({media, mediaId, reviews, details}: {media: string; mediaId: string; reviews?: any, details?: any}) {
  if(media === 'movies') {
    const { getMovie } = useMovies();
    const { getTrendingMovie } = useTrendingMovies();
    let movie = getMovie(mediaId);

    if(!movie) {
      movie = getTrendingMovie(mediaId);
    }
    return (
      <MediaShowComponent media={movie} overview={details.overview} reviews={reviews} />
    )
  }
  if(media === 'tv-series') {
    const { getSerie } = useSeries();
    const tvShow = getSerie(mediaId);
    return (
      <MediaShowComponent media={tvShow} overview={details.overview} reviews={reviews} />
    )
  }
}
