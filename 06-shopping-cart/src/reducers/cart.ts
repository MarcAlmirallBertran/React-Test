export const cartInitialState = JSON.parse(window.localStorage.getItem('cart') || '[]')

export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  INCREMENT_PRODUCT: 'INCREMENT_PRODUCT',
  DECREMENT_PRODUCT: 'DECREMENT_PRODUCT',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
}

export const updateLocalStorage = (cart: any) => {
  window.localStorage.setItem('cart', JSON.stringify(cart))
}

const UPDATE_STATE_BY_ACTION = {
  [CART_ACTION_TYPES.ADD_TO_CART]: (state, action) => {
    return [
      ...state,
      {
        ...action.payload,
        quantity: 1
      }
    ]
  },
  [CART_ACTION_TYPES.INCREMENT_PRODUCT]: (state: any[], action: any) => {
    const { id } = action.payload
    const productInCartIndex = state.findIndex(item => item.id === id)

    if (productInCartIndex >= 0) {
      return [
        ...state.slice(0, productInCartIndex),
        { ...state[productInCartIndex], quantity: state[productInCartIndex].quantity + 1 },
        ...state.slice(productInCartIndex + 1)
      ]
    }
  },
  [CART_ACTION_TYPES.DECREMENT_PRODUCT]: (state, action) => {
    const { id } = action.payload
    const productInCartIndex = state.findIndex(item => item.id === id)

    if (productInCartIndex >= 0) {
      return [
        ...state.slice(0, productInCartIndex),
        { ...state[productInCartIndex], quantity: state[productInCartIndex].quantity - 1 },
        ...state.slice(productInCartIndex + 1)
      ]
    }
  },
  [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state, action) => {
    const { id } = action.payload
    return state.filter(item => item.id !== id)
  },
  [CART_ACTION_TYPES.CLEAR_CART]: () => {
    return []
  }
}

export const cartReducer = (state, action) => {
  const { type: actionType } = action
  const updateState = UPDATE_STATE_BY_ACTION[actionType]
  const newState = updateState ? updateState(state, action) : state
  updateLocalStorage(newState)
  return newState
}