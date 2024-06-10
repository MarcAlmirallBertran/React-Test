import { type RootObject } from '../types'

export const fetchUsers = async ({ pageParam }: { pageParam: number }) => {
  return await fetch(`https://randomuser.me/api?results=10&seed=foo&page=${pageParam}`)
    .then((response) => {
      if (!response.ok) throw new Error('Response was not ok')
      return response.json()
    })
    .then((data: RootObject) => ({
      users: data.results,
      nextCursos: data.info.page + 1,
    }))
}
