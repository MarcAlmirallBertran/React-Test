import { useState } from 'react'
import { Todos } from './components/Todos'
import type { FilterValue, TodoId, TodoIdAndCompleted, TodoText } from './types'
import { FILTERS } from './consts'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

const mockTodos = [
  { id: '1', text: 'Buy milk', completed: false },
  { id: '2', text: 'Meeting with boss', completed: false },
  { id: '3', text: 'Dentist appointment', completed: false },
]

const App: React.FC = () => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(FILTERS.ALL)

  const handleRemove = ({ id }: TodoId) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleComplete = ({ id, completed }: TodoIdAndCompleted) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue) => {
    setFilterSelected(filter)
  }

  const handleRemoveCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.filter(todo => todo.completed).length

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === FILTERS.ACTIVE) return !todo.completed

    if (filterSelected === FILTERS.COMPLETED) return todo.completed

    return todo
  })

  const onAddTodo = ({ text }: TodoText) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    }

    setTodos([...todos, newTodo])
  }

  return (
    <div className="todoapp">
      <Header onAddTodo={onAddTodo} />
      <Todos
        onRemoveTodo={handleRemove}
        onToggleCompleteTodo={handleComplete}
        todos={filteredTodos}
      />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveCompleted}
        handleFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default App
