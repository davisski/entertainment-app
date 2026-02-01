import { EntertainmentCard } from "../components/EntertainmentCard";

const maxRecommended = 16;
export function Movies() {
    return (
        <>
            <div className="mb-6">
                <h1 className="text-white text-[32px]">Movies</h1>
            </div>
            <div className="flex flex-col gap-y-10">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-10 pr-8">
                    {Array.from({ length: maxRecommended }).map((_, index) => (
                        <EntertainmentCard key={index} />
                    ))}
                </div>
            </div>
        </>
    );
}