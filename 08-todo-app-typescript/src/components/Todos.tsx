import type { TodoId, TodoIdAndCompleted, TodoList } from '../types'
import { Todo } from './Todo'

interface Props {
  todos: TodoList
  onRemoveTodo: ({ id }: TodoId) => void
  onToggleCompleteTodo: ({ id, completed }: TodoIdAndCompleted) => void
}

export const Todos: React.FC<Props> = ({
  todos,
  onRemoveTodo,
  onToggleCompleteTodo,
}) => {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className={`${todo.completed ? 'completed' : ''}`}>
          <Todo
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            onRemoveTodo={onRemoveTodo}
            onToggleCompleteTodo={onToggleCompleteTodo}
          />
        </li>
      ))}
    </ul>
  )
}
