import { EntertainmentCard } from "../components/EntertainmentCard";
const maxRecommended = 16;
export function Series() {
    return (
        <>
            <div>
                <h1>Series</h1>
            </div>
            <div className="flex flex-col gap-y-10">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pr-8">
                    {Array.from({ length: maxRecommended }).map((_, index) => (
                        <EntertainmentCard key={index} />
                    ))}
                </div>
            </div>
        </>
    );
}