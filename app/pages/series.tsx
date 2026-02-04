import { EntertainmentCard } from "../components/EntertainmentCard";
import { useSeries } from "~/contexts/SeriesContext";
import { useSearch } from "~/contexts/SearchContext";

export function Series() {
    const { series, isLoading } = useSeries();
    const { filteredResults } = useSearch();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="mb-6">
                <h1 className="text-white text-[32px]">TV Series</h1>
            </div>
            <div className="flex flex-col gap-y-10">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-6 pr-8">
                    {filteredResults.length > 0 ? (
                        filteredResults.map((show) => (
                            <EntertainmentCard key={show.id} id={show.id} title={show.name} release_date={show.first_air_date} media_type={show.media_type} poster_path={show.poster_path} />
                        ))
                    ) : (
                        series.map((show) => (
                            <EntertainmentCard key={show.id} id={show.id} title={show.name} release_date={show.first_air_date} media_type={show.media_type} poster_path={show.poster_path} />
                        ))
                    )}
                </div>
            </div>
        </>
    );
}