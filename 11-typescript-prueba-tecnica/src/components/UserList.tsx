import React from 'react'
import { User, SortBy } from '../types.d'

interface Props {
  users: User[]
  showColors: boolean
  deleteUser: (email: string) => void
  changeSort: (sort: SortBy) => void
}

export const UserList: React.FC<Props> = ({ users, showColors, deleteUser, changeSort }) => {
  return (
    <table style={{ marginLeft: 'auto', marginRight: 'auto' }}>
      <thead>
        <tr>
          <th>Picture</th>
          <th className="pointer" onClick={() => changeSort(SortBy.NAME)}>
            Name
          </th>
          <th className="pointer" onClick={() => changeSort(SortBy.SURNAME)}>
            Surname
          </th>
          <th className="pointer" onClick={() => changeSort(SortBy.COUNTRY)}>
            Country
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className={showColors ? 'table--showColors' : ''}>
        {users.map((user) => {
          return (
            <tr key={user.email}>
              <td>
                <img src={user.picture.thumbnail} alt={`Picture of the user ${user.name.first}`} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => deleteUser(user.email)}>Delete</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
