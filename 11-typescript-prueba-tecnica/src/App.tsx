import { useMemo, useState } from 'react'
import { SortBy } from './types.d'
import { UserList } from './components/UserList'
import './App.css'
import { useUsers } from './hooks/useUsers'

function App() {
  const { isFetching, isError, users, refetch, fetchNextPage, hasNextPage } = useUsers()
  const [showColors, setShowColors] = useState(false)
  const [sortByColumn, setSortByColumn] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string>('')

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSortByColumn((value) => (value !== sort ? sort : SortBy.NONE))
  }

  const filteredUsers = useMemo(() => {
    return filterCountry
      ? users.filter((user) => {
          return user.location.country.includes(filterCountry)
        })
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    if (sortByColumn === SortBy.NAME) {
      return filteredUsers.toSorted((a, b) => {
        return a.name.first.localeCompare(b.name.first)
      })
    } else if (sortByColumn === SortBy.SURNAME) {
      return filteredUsers.toSorted((a, b) => {
        return a.name.last.localeCompare(b.name.last)
      })
    } else if (sortByColumn === SortBy.COUNTRY) {
      return filteredUsers.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country)
      })
    } else {
      return filteredUsers
    }
  }, [filteredUsers, sortByColumn])

  const countryList = [...new Set(users.map((user) => user.location.country))].sort()

  const handleDelete = (email: string) => {
    // const updatedUsers = users.filter((user) => user.email !== email)
    // setUsers(updatedUsers)
    // if (!updatedUsers.some((user) => user.location.country === filterCountry)) {
    //   setFilterCountry('')
    // }
  }

  const handleReset = () => {
    refetch()
  }

  return (
    <div>
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>Prueba tecnica</h1>
      <header style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <button onClick={toggleColors}>Toggle colors</button>
        <button onClick={() => handleChangeSort(SortBy.COUNTRY)}>Country order</button>
        <button onClick={handleReset}>Reset users</button>
        <select
          name="countries"
          id="countries"
          value={filterCountry}
          onChange={(event) => setFilterCountry(event.target.value)}
        >
          <option value="" />
          {countryList.map((country) => {
            return (
              <option key={country} value={country}>
                {country}
              </option>
            )
          })}
        </select>
      </header>
      {users.length > 0 && (
        <UserList
          users={sortedUsers}
          showColors={showColors}
          deleteUser={handleDelete}
          changeSort={handleChangeSort}
        />
      )}
      {isFetching && <strong>Loading...</strong>}
      {!isFetching && isError && <strong>Error loading users</strong>}
      {hasNextPage && !isFetching && !isError && (
        <button onClick={() => fetchNextPage()}>Load more users</button>
      )}
    </div>
  )
}

export default App
