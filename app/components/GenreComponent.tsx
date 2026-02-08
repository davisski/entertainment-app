export const GenreComponent = ({genres, handleGenreChange}: {genres: any[], handleGenreChange: (event: React.ChangeEvent<HTMLSelectElement>) => void}) => {
  return (
    <select onChange={handleGenreChange} className="bg-red-500 text-white px-3 py-1.5 rounded-md w-48 mb-6">
        <option key="default" selected disabled value="">Select a genre</option>
        {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
                {genre.name}
            </option>
        ))}
    </select>
  )
}
