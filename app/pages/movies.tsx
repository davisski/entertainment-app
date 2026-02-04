import { EntertainmentCard } from "../components/EntertainmentCard";
import { useMovies } from "~/contexts/MovieContext";
import { useSearch } from "~/contexts/SearchContext";

export function Movies() {
    const { movies, isLoading } = useMovies();
    const { filteredResults } = useSearch();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="mb-6">
                <h1 className="text-white text-[32px]">Movies</h1>
            </div>
            <div className="flex flex-col gap-y-10">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-10 pr-8">
                    {filteredResults.length > 0 ? (
                        filteredResults.map((movie) => (
                            <EntertainmentCard key={movie.id} {...movie} />
                        ))
                    ) : (
                        movies.map((movie) => (
                            <EntertainmentCard key={movie.id} {...movie} />
                        ))
                    )}
                </div>
            </div>
        </>
    );
}