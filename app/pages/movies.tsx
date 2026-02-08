import { useMemo, useState } from "react";
import { EntertainmentCard } from "../components/EntertainmentCard";
import { useMovies } from "~/contexts/MovieContext";
import { useMovieGenres } from "~/contexts/MovieGenreContext";
import { useSearch } from "~/contexts/SearchContext";
import { GenreComponent } from "~/components/GenreComponent";

export function Movies() {
    const { movies, isLoading } = useMovies();
    const { filteredResults } = useSearch();
    const { genres } = useMovieGenres();
    const [currentGenre, setCurrentGenre] = useState<string>("");

    // Determine which movies to display based on priority
    const displayedMovies = useMemo(() => {
        // If there are search results, use them
        let moviesToFilter = filteredResults.length > 0 ? filteredResults : movies;

        // If a genre is selected, filter by genre
        if (currentGenre == "") return moviesToFilter;
        
        return moviesToFilter.filter((movie) =>
            movie.genre_ids.includes(Number(currentGenre))
        );
    }, [filteredResults, movies, currentGenre]);

    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGenre = event.target.value;
        setCurrentGenre(selectedGenre);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="mb-6 flex justify-between items-center pr-8">
                <h1 className="text-white text-[32px]">Movies</h1>
                <GenreComponent genres={genres} handleGenreChange={handleGenreChange} />
            </div>
            <div className="flex flex-col gap-y-10">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-10 pr-8">
                    {displayedMovies.length ? displayedMovies.map((movie) => (
                        <EntertainmentCard key={movie.id} {...movie} />
                    )) : (
                        <p className="text-white">No movies found.</p>
                    )}
                </div>
            </div>
        </>
    );
}