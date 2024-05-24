import type { TodoId, TodoIdAndCompleted, Todo as TodoType } from '../types'

interface Props extends TodoType {
  onRemoveTodo: ({ id }: TodoId) => void
  onToggleCompleteTodo: ({ id, completed }: TodoIdAndCompleted) => void
}

export const Todo: React.FC<Props> = ({
  id,
  text,
  completed,
  onRemoveTodo,
  onToggleCompleteTodo,
}) => {
  return (
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        checked={completed}
        onChange={event =>
          onToggleCompleteTodo({ id, completed: event.target.checked })
        }
      />
      <label>{text}</label>
      <button className="destroy" onClick={() => onRemoveTodo({ id })}></button>
    </div>
  )
}
