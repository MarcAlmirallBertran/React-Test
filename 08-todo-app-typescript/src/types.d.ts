export type Todo = {
  id: string
  text: string
  completed: boolean
}

export type TodoId = Pick<Todo, 'id'>
export type TodoText = Pick<Todo, 'text'>
export type TodoIdAndCompleted = Pick<Todo, 'id' | 'completed'>

export type FilterValue = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS]

export type TodoList = Todo[]
