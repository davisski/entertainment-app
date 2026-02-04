import { EntertainmentCard } from "../components/EntertainmentCard";
import { useSeries } from "~/contexts/SeriesContext";

export function Series() {
    const { series, isLoading } = useSeries();

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
                    {series.map((show) => (
                        <EntertainmentCard key={show.id} {...show} />
                    ))}
                </div>
            </div>
        </>
    );
}