import { Middleware, configureStore } from '@reduxjs/toolkit'
import { toast } from 'sonner'
import usersReducer, { rollbackUser } from './users/slice'

const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
  next(action)
  localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
}

const syncWithDataBaseMiddleware: Middleware = (store) => (next) => (action) => {
  const { type, payload: userIdToRemove } = action
  const previousState = store.getState()

  next(action)

  if (type === 'users/deleteUserById') {
    const userToRemove = previousState.users.find((user) => user.id === userIdToRemove)
    fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          toast.success('User deleted successfully')
        }
      })
      .catch((error) => {
        if (userToRemove) store.dispatch(rollbackUser(userToRemove))
        toast.error('Error deleting user from database')
        console.error('Error deleting user from database', error)
      })
  } else if (type === 'users/addNewUser') {
    fetch(`https://jsonplaceholder.typicode.com/users`, {
      method: 'POST',
    })
      .then((response) => {
        if (response.ok) {
          toast.success('User created successfully')
        }
      })
      .catch((error) => {
        toast.error('Error creating user from database')
        console.error('Error creating user from database', error)
      })
  }
}

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(persistanceLocalStorageMiddleware)
      .concat(syncWithDataBaseMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
