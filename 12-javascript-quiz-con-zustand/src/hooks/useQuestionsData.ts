import { useQuestionsStore } from '../store/questions'

export const useQuestionsData = () => {
  const questions = useQuestionsStore((state) => state.questions)

  let correctAnswers = 0
  let wrongAnswers = 0
  let unanswered = 0

  questions.forEach((question) => {
    if (question.userSelectedAnswer == null) {
      unanswered++
    } else if (question.isCorrectUserAnswer) {
      correctAnswers++
    } else {
      wrongAnswers++
    }
  })

  return { correctAnswers, wrongAnswers, unanswered }
}
