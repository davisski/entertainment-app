import { ReviewItemComponent } from "./ReviewItemComponent";
export const ReviewsComponent = ({ reviews }: { reviews: any }) => {
  if (!reviews || !reviews.results) return null;
  return (
    <ul className="flex flex-col gap-4 flex-1 p-6">
      {reviews.results.map((review: any) => (
        <ReviewItemComponent key={review.id} review={review} />
      ))}
    </ul>
  )
}
