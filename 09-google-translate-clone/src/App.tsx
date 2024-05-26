import { useTranslateReducer } from './hooks/useTranslateReducer'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons.tsx'
import { LanguageSelector } from './components/LanguageSelector.tsx'
import { SectionType } from './consts.ts'
import { TextArea } from './components/TextArea.tsx'
import { useEffect } from 'react'
import { translateText } from './services/translate.ts'
import { useDebounce } from './hooks/useDebounce.ts'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { textToSpeech } from './services/voice.ts'

function App() {
  const {
    translate,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setToText,
    setLoading,
  } = useTranslateReducer()

  const debounceFromText = useDebounce(translate.fromText, 200)

  useEffect(() => {
    setToText('')
    if (debounceFromText === '') return
    setLoading(true)
    if (translate.fromText !== debounceFromText) return
    translateText({
      fromLanguage: translate.fromLanguage,
      toLanguage: translate.toLanguage,
      text: debounceFromText,
    })
      .then((result) => {
        setLoading(false)
        if (result == null) return
        setToText(result)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [debounceFromText, translate.fromLanguage, translate.toLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(translate.toText).catch(() => {})
  }

  const handleSpeak = () => {
    // const utterance = new SpeechSynthesisUtterance(translate.toText)
    // utterance.lang = translate.toLanguage
    // speechSynthesis.speak(utterance)
    textToSpeech(translate.toText).then((response) => {
      // Crear un blob a partir del arrayBuffer
      const blob = new Blob([response], { type: 'audio/mpeg' })

      // Crear una URL de objeto a partir del blob
      const url = URL.createObjectURL(blob)

      // Crear un objeto de audio y reproducirlo
      const audio = new Audio(url)
      audio.play()
    })
  }

  return (
    <Container fluid>
      <h2>Google Translate</h2>
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={translate.fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea type={SectionType.From} value={translate.fromText} onChange={setFromText} />
          </Stack>
        </Col>
        <Col xs="auto">
          <Button variant="link" onClick={() => interchangeLanguages()}>
            <ArrowsIcon />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={translate.toLanguage}
              onChange={setToLanguage}
            />
            <div style={{ position: 'relative' }}>
              <TextArea
                loading={translate.loading}
                type={SectionType.To}
                value={translate.toText}
                onChange={setToText}
              />
              {translate.toText !== '' && (
                <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
                  <Button variant="link" onClick={handleClipboard}>
                    <ClipboardIcon />
                  </Button>
                  <Button variant="link" onClick={handleSpeak}>
                    <SpeakerIcon />
                  </Button>
                </div>
              )}
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
