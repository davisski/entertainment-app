export const TeamListComponent = ({ team }: { team: any }) => {
  let image = '';
  return (
    <div className="mt-6">
      <h2 className="text-white text-2xl mb-4">Team</h2>
      <div className="flex gap-4 overflow-x-auto">
        {team.map((castMember: any) => {
          image = castMember.profile_path ? `https://image.tmdb.org/t/p/w500/${castMember.profile_path}` : 'https://placehold.net/400x400.png';
          return (
            <div key={castMember.id} className="min-w-max pb-3 flex flex-col items-center">
              <img className="w-24 h-36 object-cover rounded-lg" src={image} alt={castMember.name} />
              <p className="text-white mt-2 text-sm">{castMember.name}</p>
              <p className="text-gray-400 text-xs">{castMember.character}</p>
              <p className="text-gray-400 text-xs">{castMember.known_for_department}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
