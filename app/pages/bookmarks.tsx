import { EntertainmentCard } from "../components/EntertainmentCard";
import { useBookmarks } from "../contexts/BookmarkContext";
import { useMovies } from "../contexts/MovieContext";
import { useSeries } from "../contexts/SeriesContext";
export function Bookmarks() {
    const { bookmarks } = useBookmarks();
    const { movies } = useMovies();
    const { series } = useSeries();

    const bookmarkedMovies = movies.filter((movie) => bookmarks.includes(movie.id));
    const bookmarkedSeries = series.filter((serie) => bookmarks.includes(serie.id));

    const combinedBookmarks = [...bookmarkedMovies, ...bookmarkedSeries];
    return (
        <>
            <div className="mb-6">
                <h1 className="text-white text-[32px]">Bookmarks</h1>
            </div>

            <div className="flex flex-col">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-10 pr-8">
                    {combinedBookmarks.map((item) => (
                        <EntertainmentCard key={item.id} {...item} />
                    ))}
                </div>
            </div>
        </>
    );
}