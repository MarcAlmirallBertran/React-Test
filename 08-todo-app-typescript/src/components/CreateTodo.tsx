import { useState } from 'react'
import { type TodoText } from '../types'

interface Props {
  onAddTodo: ({ text }: TodoText) => void
}

export const CreateTodo: React.FC<Props> = ({ onAddTodo }) => {
  const [inputText, setInputText] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onAddTodo({ text: inputText })
    setInputText('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        value={inputText}
        onChange={(event) => {
          setInputText(event.target.value)
        }}
        placeholder="What needs to be done?"
        autoFocus
      />
    </form>
  )
}
