import type {
  TRANSLATE_ACTION_TYPES,
  TO_SUPPORTED_LANGUAGES,
  FROM_SUPPORTED_LANGUAGES,
} from './consts.ts'

export type ToLanguage = keyof typeof TO_SUPPORTED_LANGUAGES
export type FromLanguage = keyof typeof FROM_SUPPORTED_LANGUAGES

export interface Translate {
  fromLanguage: FromLanguage
  toLanguage: ToLanguage
  fromText: string
  toText: string
  loading: boolean
}

export type TranslateAction =
  | { type: typeof TRANSLATE_ACTION_TYPES.INTERCHANGE_LANGUAGES }
  | { type: typeof TRANSLATE_ACTION_TYPES.SET_FROM_LANGUAGE; payload: FromLanguage }
  | { type: typeof TRANSLATE_ACTION_TYPES.SET_TO_LANGUAGE; payload: ToLanguage }
  | { type: typeof TRANSLATE_ACTION_TYPES.SET_FROM_TEXT; payload: string }
  | { type: typeof TRANSLATE_ACTION_TYPES.SET_TO_TEXT; payload: string }
  | { type: typeof TRANSLATE_ACTION_TYPES.SET_LOADING; payload: boolean }
