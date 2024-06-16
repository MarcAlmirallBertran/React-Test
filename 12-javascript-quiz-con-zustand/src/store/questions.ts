import { create } from 'zustand'
import { type Question } from '../types.d'
import { devtools, persist } from 'zustand/middleware'
import { fetchQuestions } from '../services/questions'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => void
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPrevQuestion: () => void
  reset: () => void
}

export const useQuestionsStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          questions: [],
          currentQuestion: 0,

          fetchQuestions: (limit: number) => {
            fetchQuestions(limit).then((questions: Question[]) => {
              set({ questions }, false, 'FETCH_QUESTIONS')
            })
          },

          selectAnswer: (questionId: number, answerIndex: number) => {
            const { questions } = get()
            const newQuestions = structuredClone(questions)
            const questionIndex = newQuestions.findIndex((q) => q.id === questionId)
            const question = newQuestions[questionIndex]
            const isCorrectUserAnswer = question.correctAnswer === answerIndex
            newQuestions[questionIndex] = {
              ...question,
              userSelectedAnswer: answerIndex,
              isCorrectUserAnswer,
            }
            set({ questions: newQuestions }, false, 'SELECT_ANSWER')
          },

          goNextQuestion: () => {
            const { currentQuestion, questions } = get()
            const nextQuestion = currentQuestion + 1

            if (nextQuestion < questions.length) {
              set({ currentQuestion: nextQuestion }, false, 'GO_NEXT_QUESTION')
            }
          },

          goPrevQuestion: () => {
            const { currentQuestion } = get()
            const prevQuestion = currentQuestion - 1

            if (prevQuestion >= 0) {
              set({ currentQuestion: prevQuestion }, false, 'GO_PREVIOUS_QUESTION')
            }
          },

          reset: () => {
            set({ questions: [], currentQuestion: 0 }, false, 'RESET')
          },
        }
      },
      { name: 'questions' },
    ),
  ),
)
