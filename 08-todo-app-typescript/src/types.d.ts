import { FILTERS } from './consts.ts'

export type Todo = {
  id: string
  text: string
  completed: boolean
}

export type TodoId = Pick<Todo, 'id'>
export type TodoText = Pick<Todo, 'text'>
export type TodoIdAndCompleted = Pick<Todo, 'id' | 'completed'>

export type FilterValue = (typeof FILTERS)[keyof typeof FILTERS]

export type TodoList = Todo[]
