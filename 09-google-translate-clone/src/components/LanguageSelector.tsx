import React from 'react'
import { Form } from 'react-bootstrap'
import { FROM_SUPPORTED_LANGUAGES, SectionType, TO_SUPPORTED_LANGUAGES } from '../consts'
import type { FromLanguage, ToLanguage } from '../type'

type Props =
  | { type: SectionType.From; value: FromLanguage; onChange: (language: FromLanguage) => void }
  | { type: SectionType.To; value: ToLanguage; onChange: (language: ToLanguage) => void }

export const LanguageSelector: React.FC<Props> = ({ type, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as ToLanguage)
  }

  const Languages = type === SectionType.From ? FROM_SUPPORTED_LANGUAGES : TO_SUPPORTED_LANGUAGES

  return (
    <Form.Select aria-label="Select language" value={value} onChange={handleChange}>
      {Object.entries(Languages).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  )
}
