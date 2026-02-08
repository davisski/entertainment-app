import { useState, useMemo } from "react";
import { EntertainmentCard } from "../components/EntertainmentCard";
import { useSeries } from "~/contexts/SeriesContext";
import { useSearch } from "~/contexts/SearchContext";
import { useSeriesGenres } from "~/contexts/SeriesGenreContext";
import { GenreComponent } from "~/components/GenreComponent";

export function Series() {
    const { series, isLoading } = useSeries();
    const { filteredResults } = useSearch();
    const { genres } = useSeriesGenres();
    const [selectedGenre, setSelectedGenre] = useState<string>("");

    const filteredSeries = useMemo(() => {
        const results = filteredResults.length > 0 ? filteredResults : series;
        if (selectedGenre == "") return results;
        return results.filter((show) => show.genre_ids.includes(Number(selectedGenre)));
    }, [series, selectedGenre, filteredResults]);

    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGenre = event.target.value;
        setSelectedGenre(selectedGenre);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="mb-6 flex items-center justify-between pr-8">
                <h1 className="text-white text-[32px]">TV Series</h1>
                <GenreComponent genres={genres} handleGenreChange={handleGenreChange} />
            </div>
            <div className="flex flex-col gap-y-10">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-6 pr-8">
                    {filteredSeries.length > 0 ? (
                        filteredSeries.map((show) => (
                            <EntertainmentCard key={show.id} id={show.id} title={show.name} release_date={show.first_air_date} media_type={show.media_type} poster_path={show.poster_path} vote_average={show.vote_average} />
                        ))
                    ) : (
                        <p className="text-white">No series found.</p>
                    )}
                </div>
            </div>
        </>
    );
}