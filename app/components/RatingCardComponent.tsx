export const RatingCardComponent = ({rating}: {rating: number}) => {
    let formattedRating: string = rating > 0 ? rating.toFixed(1) : "N/R";
    return (
        <span className="absolute bottom-2 px-2 py-1 rounded-sm bg-blue-900 right-2 text-red-500">{formattedRating}</span>
    ) 
}
