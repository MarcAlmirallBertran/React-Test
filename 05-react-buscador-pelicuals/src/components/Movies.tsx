function ListOfMovies ({ movies }: { movies: any[] }) {
  return (
    <ul className="movies">
      {
        movies.map((movie: any) => (
          <li className="movie" key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.poster} alt={`Image of the movie ${movie.title}`} />
          </li>
        ))
      }
    </ul>
  )
}

function NoResults () {
  return <p>No results found</p>
}

export function Movies ({ movies, hasMovies }: { movies: any[], hasMovies: boolean }) {
  return (
    <main>
      {
        hasMovies ? <ListOfMovies movies={movies} /> : <NoResults />
      }
    </main>
  )
}