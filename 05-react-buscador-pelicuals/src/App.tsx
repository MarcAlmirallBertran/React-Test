import { useCallback, useEffect, useRef, useState } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'
import './App.css'

function useSearch () {
  const [search, updateSearch] = useState<string>('')
  const [error, setError] = useState<string | null>('')
  const isFirstInput = useRef<boolean>(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      if (isFirstInput.current)
        return
    }
    let e: string | null = ''

    if (search === '')
      e += 'No se puede buscar una película vacía\n'

    if (search.match(/^\d+$/))
      e += 'No se puede buscar una película con un número\n'

    if (search.length < 3)
      e += 'La búsqueda debe tener al menos 3 caracteres\n'

    setError(e || null)
  }, [search])

  return { search, updateSearch, error }
}

function App() {
  const [sort, setSort] = useState<boolean>(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, hasMovies, loading, getMovies } = useMovies({ sort })

  const debounceGetMovies = useCallback(
    debounce((search: string) => {
      getMovies({ search })
    }, 500), [getMovies]
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    if (error === null)
      debounceGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Movies search</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} placeholder='Avangers, Star Wars...' />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Search</button>
        </form>
        {error && <p style={{ color: 'red', whiteSpace: 'break-spaces' }}>{error}</p>}
      </header>
      <main>
        { 
          loading ? 
            <p>Loading...</p> : 
            <Movies movies={movies} hasMovies={hasMovies} /> 
        }
      </main>
    </div>
  )
}

export default App
