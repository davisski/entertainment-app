export const ReviewItemComponent = ({ review }: { review: any }) => {
  return (
    <li key={review.id} className="">
        <div className="flex gap-2 items-center">
          <img className="rounded-full h-8 w-8 bg-blue-500" src={review.author_details.avatar_path ? `https://image.tmdb.org/t/p/w500/${review.author_details.avatar_path}` : 'https://placehold.net/avatar.svg'} alt={review.author} />
          <h3 className="text-blue-500">{review.author}</h3>
        </div>
        <p className="text-white leading-8">{review.content}</p>
    </li>
  )
}
