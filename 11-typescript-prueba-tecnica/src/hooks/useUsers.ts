import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchUsers } from '../services/users'

export const useUsers = () => {
  const { isFetching, isError, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['users'],
    initialPageParam: 1,
    queryFn: fetchUsers,
    getNextPageParam: (lastPage) => lastPage.nextCursos,
    refetchOnWindowFocus: false,
  })

  const users = data?.pages.flatMap((page) => page.users) ?? []

  return {
    isFetching,
    isError,
    users,
    refetch,
    fetchNextPage,
    hasNextPage,
  }
}
