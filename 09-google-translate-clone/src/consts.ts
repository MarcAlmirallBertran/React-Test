export const TRANSLATE_ACTION_TYPES = {
  INTERCHANGE_LANGUAGES: 'INTERCHANGE_LANGUAGES',
  SET_FROM_LANGUAGE: 'SET_FROM_LANGUAGE',
  SET_TO_LANGUAGE: 'SET_TO_LANGUAGE',
  SET_FROM_TEXT: 'SET_FROM_TEXT',
  SET_TO_TEXT: 'SET_TO_TEXT',
  SET_LOADING: 'SET_LOADING',
} as const

export const TO_SUPPORTED_LANGUAGES = {
  en: 'English',
  es: 'Español',
  cat: 'Catala',
} as const

export const AUTO_LANGUAGE = { auto: 'Detect language' }

export const FROM_SUPPORTED_LANGUAGES = {
  ...AUTO_LANGUAGE,
  ...TO_SUPPORTED_LANGUAGES,
} as const

export enum SectionType {
  From = 'from',
  To = 'to',
}
