import { ReviewsComponent } from "./ReviewsComponent";
export const MediaShowComponent = ({media, overview, reviews}: {media: any, overview: string, reviews: any}) => {
  return (
    <div className="flex max-w-360 relative gap-6 justify-between">
        <div className="h-screen fixed bg-blend-multiply bg-red-500 top-0 w-1/2 bg-cover bg-top" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${media.poster_path})` }}>
        </div>
        <div className="absolute w-1/2 right-4 top-[50%] bg-blue-rgba-950 p-6 rounded-2xl">
            <div className="flex justify-between items-center">
            <h1 className="text-white font-semibold text-4xl">{media.title ?? media.name}</h1>
            <span className="text-blue-500 text-2xl">{media.release_date ?? media.first_air_date}</span>
            </div>
            <p className="text-white leading-8 flex-1">{overview}</p>
            <ReviewsComponent reviews={reviews} />
        </div>
    </div>
  )
}
