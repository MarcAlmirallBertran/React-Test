import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ sort }: { sort: boolean}) {
  const [movies, setMovies] = useState<any>([])
  const [hasMovies, setHasMovies] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const oldSearch = useRef<string | null>(null)

  const getMovies = useCallback(async ({ search }: { search: string }) => {
    if (search === oldSearch.current) {
      return
    }
    try {
      setLoading(true)
      setError(null)
      const response = await searchMovies({ search })
      oldSearch.current = search
      setMovies(response)
      setHasMovies(response.length > 0)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const sortedMovies = useMemo(() => {
    return sort 
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) 
      : movies
  }, [movies, sort])
  
  return { movies: sortedMovies, hasMovies, loading, error, getMovies }
}