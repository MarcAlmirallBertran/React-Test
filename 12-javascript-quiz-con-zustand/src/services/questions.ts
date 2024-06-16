import { Question } from '../types'

export const fetchQuestions = async (limit: number) => {
  return await fetch(`http://localhost:5173/data.json`)
    .then((res) => res.json())
    .then((data: Question[]) => {
      return data.sort(() => Math.random() - 0.5).slice(0, limit)
    })
}
