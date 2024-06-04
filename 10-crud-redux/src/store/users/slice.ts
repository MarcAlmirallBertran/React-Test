import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

const DEFAULT_STATE = [
  {
    id: crypto.randomUUID(),
    name: 'Marc Almirall',
    email: 'marc.almirall@gmail.com',
    github: 'MarcAlmirallBertran',
  },
  {
    id: crypto.randomUUID(),
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    github: 'johndoe',
  },
  {
    id: crypto.randomUUID(),
    name: 'Jane Doe',
    email: 'jane.doe@gmail.com',
    github: 'janedoe',
  },
]

export type UserId = string

export interface User {
  name: string
  email: string
  github: string
}

export interface UserWithId extends User {
  id: UserId
}

const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem('__redux__state__')
  return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE
})()

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID()
      state.push({ id, ...action.payload })
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
      return state.filter((user) => user.id !== id)
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlready = state.some((user) => user.id === action.payload.id)
      if (!isUserAlready) {
        state.push(action.payload)
      }
    },
  },
})

export default usersSlice.reducer

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions
