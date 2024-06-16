import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import { pink } from '@mui/material/colors'
import { useQuestionsData } from './hooks/useQuestionsData'
import { Button } from '@mui/material'
import { useQuestionsStore } from './store/questions'

export const Footer = () => {
  const { correctAnswers, wrongAnswers, unanswered } = useQuestionsData()
  const reset = useQuestionsStore((state) => state.reset)

  return (
    <footer>
      <p style={{ justifyContent: 'center', display: 'flex' }}>
        <DoneIcon color="success" />
        Correct answers: {correctAnswers}
      </p>
      <p style={{ justifyContent: 'center', display: 'flex' }}>
        <CloseIcon sx={{ color: pink[500] }} />
        Wrong answers: {wrongAnswers}
      </p>
      <p style={{ justifyContent: 'center', display: 'flex' }}>
        <QuestionMarkIcon color="disabled" />
        Unanswered: {unanswered}
      </p>
      <Button onClick={() => reset()}>Reset</Button>
    </footer>
  )
}
