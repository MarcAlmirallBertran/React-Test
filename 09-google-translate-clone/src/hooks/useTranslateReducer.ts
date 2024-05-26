import { useReducer } from 'react'
import { TRANSLATE_ACTION_TYPES } from '../consts'
import type { FromLanguage, ToLanguage, Translate, TranslateAction } from '../type'

const tanslateReducer = (state: Translate, action: TranslateAction): Translate => {
  const { type } = action

  if (type === TRANSLATE_ACTION_TYPES.INTERCHANGE_LANGUAGES) {
    let newState = {
      ...state,
      fromText: state.toText,
      fromLanguage: state.toLanguage,
    }
    if (state.fromLanguage !== 'auto') {
      newState = {
        ...newState,
        toLanguage: state.fromLanguage,
      }
    }
    return newState
  } else if (type === TRANSLATE_ACTION_TYPES.SET_FROM_LANGUAGE) {
    return {
      ...state,
      fromLanguage: action.payload,
    }
  } else if (type === TRANSLATE_ACTION_TYPES.SET_TO_LANGUAGE) {
    return {
      ...state,
      toLanguage: action.payload,
    }
  } else if (type === TRANSLATE_ACTION_TYPES.SET_FROM_TEXT) {
    return {
      ...state,
      fromText: action.payload,
    }
  } else if (type === TRANSLATE_ACTION_TYPES.SET_TO_TEXT) {
    return {
      ...state,
      toText: action.payload,
    }
  } else if (type === TRANSLATE_ACTION_TYPES.SET_LOADING) {
    return {
      ...state,
      loading: action.payload,
    }
  }

  return state
}

const initialState: Translate = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  toText: '',
  loading: false,
}

export function useTranslateReducer() {
  const [state, dispatch] = useReducer(tanslateReducer, initialState)

  const interchangeLanguages = () =>
    dispatch({
      type: TRANSLATE_ACTION_TYPES.INTERCHANGE_LANGUAGES,
    })

  const setFromLanguage = (fromLanguage: FromLanguage) =>
    dispatch({
      type: TRANSLATE_ACTION_TYPES.SET_FROM_LANGUAGE,
      payload: fromLanguage,
    })

  const setToLanguage = (toLanguage: ToLanguage) =>
    dispatch({
      type: TRANSLATE_ACTION_TYPES.SET_TO_LANGUAGE,
      payload: toLanguage,
    })

  const setFromText = (fromText: string) =>
    dispatch({
      type: TRANSLATE_ACTION_TYPES.SET_FROM_TEXT,
      payload: fromText,
    })

  const setToText = (toText: string) =>
    dispatch({
      type: TRANSLATE_ACTION_TYPES.SET_TO_TEXT,
      payload: toText,
    })
  const setLoading = (loading: boolean) =>
    dispatch({
      type: TRANSLATE_ACTION_TYPES.SET_LOADING,
      payload: loading,
    })

  return {
    translate: state,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setToText,
    setLoading,
  }
}
