import { Form } from 'react-bootstrap'
import { SectionType } from '../consts'

interface Props {
  type: SectionType
  loading?: boolean
  onChange: (value: string) => void
  value: string
}

const commonStyle: React.CSSProperties = { border: 0, height: '200px', resize: 'none' }

const getPlaceholder = ({ type, loading }: { type: SectionType; loading?: boolean }) => {
  if (type === SectionType.From) return 'Enter text'
  else if (loading) return 'Translating...'
  else return 'Translation'
}

export const TextArea: React.FC<Props> = ({ type, loading, onChange, value }) => {
  const styles = type === SectionType.To ? { ...commonStyle, background: '#f5f5f5' } : commonStyle

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      as="textarea"
      placeholder={getPlaceholder({ type, loading })}
      autoFocus={type === SectionType.From}
      style={styles}
      value={value}
      disabled={type === SectionType.To}
      onChange={handleChange}
    />
  )
}
