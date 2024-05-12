const API_KEY = '538210e9'

export const searchMovies = async ({ search }: {search: string}) => {
    if (search === null) {
        return
    }
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const data = await response.json()

        if (data.Response === 'False')
            return []
        
        const movies =  data.Search
        return movies?.map((movie: any) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster
        }))
    } catch (error) {
        throw new Error('Error fetching movies')
    }
}