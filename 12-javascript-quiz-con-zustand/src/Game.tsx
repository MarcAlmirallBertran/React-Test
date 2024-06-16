import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { useQuestionsStore } from './store/questions'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { type Question as QuestionType } from './types.d'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { Footer } from './Footer'

const getBackgroundColor = (index: number, info: QuestionType) => {
  const { userSelectedAnswer, correctAnswer } = info
  let backgroundColor = 'transparent'

  if (userSelectedAnswer === index) {
    backgroundColor = correctAnswer === index ? 'lightgreen' : 'lightcoral'
  } else if (userSelectedAnswer != null && correctAnswer === index) {
    backgroundColor = 'lightgreen'
  }

  return backgroundColor
}

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer)

  return (
    <Card variant="outlined" sx={{ p: 2, textAlign: 'left', marginTop: 4, maxWidth: '100%' }}>
      <Typography variant="h5">{info.question}</Typography>

      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>

      <List>
        {info.answers.map((answer, index) => (
          <ListItem disablePadding key={index}>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              sx={{ backgroundColor: getBackgroundColor(index, info) }}
              onClick={() => selectAnswer(info.id, index)}
            >
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions)
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion)
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion)
  const goPrevQuestion = useQuestionsStore((state) => state.goPrevQuestion)

  const info = questions[currentQuestion]
  return (
    <>
      <Question info={info} />
      <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
        <IconButton onClick={goPrevQuestion} disabled={currentQuestion === 0} sx={{ fontSize: 40 }}>
          <ArrowBack />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestion >= questions.length - 1}
          sx={{ fontSize: 40 }}
        >
          <ArrowForward />
        </IconButton>
      </Stack>
      <Footer />
    </>
  )
}
