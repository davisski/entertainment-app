export const ReviewItemComponent = ({ review }: { review: any }) => {
  return (
    <li key={review.id}>
        <h3>{review.author}</h3>
        <p>{review.content}</p>
    </li>
  )
}
