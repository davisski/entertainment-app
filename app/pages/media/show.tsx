import { ReviewsComponent } from "~/components/ReviewsComponent";
import { useMovies } from "~/contexts/MovieContext";
import { useSeries } from "~/contexts/SeriesContext";

export function Show({media, mediaId, reviews}: {media: string; mediaId: string; reviews?: any}) {
  if(media === 'movies') {
    const { getMovie } = useMovies();
    const movie = getMovie(mediaId);
    return (
      <div className="text-white">
        <h1>{movie?.title}</h1>
        <ReviewsComponent reviews={reviews} />
      </div>
    )
  }
  if(media === 'tv-series') {
    const { getSerie } = useSeries();
    const tvShow = getSerie(mediaId);
    return (
      <div className="text-white">
        <h1>{tvShow?.name}</h1>
        <ReviewsComponent reviews={reviews} />
      </div>
    )
  }
}
