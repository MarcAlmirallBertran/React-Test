import { createContext, ReactNode, useReducer } from "react";
import { cartReducer, cartInitialState, CART_ACTION_TYPES } from "../reducers/cart";

export const CartContext = createContext({})

function useCartReducer() {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = (product: any) => dispatch({ 
    type: CART_ACTION_TYPES.ADD_TO_CART, 
    payload: product 
  })

  const incrementProduct = (product: any) => dispatch({ 
    type: CART_ACTION_TYPES.INCREMENT_PRODUCT, 
    payload: product 
  })

  const decrementProduct = (product: any) => dispatch({ 
    type: CART_ACTION_TYPES.DECREMENT_PRODUCT, 
    payload: product 
  })

  const removeFromCart = (product: any) => dispatch({ 
    type: CART_ACTION_TYPES.REMOVE_FROM_CART, 
    payload: product 
  })

  const clearCart = () => dispatch({ 
    type: CART_ACTION_TYPES.CLEAR_CART 
  })

  return { cart: state, addToCart, incrementProduct, decrementProduct, removeFromCart, clearCart }
}

export function CartProvider({ children }: { children: ReactNode }) {

  const { cart, addToCart, incrementProduct, decrementProduct, removeFromCart, clearCart } = useCartReducer()

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      incrementProduct,
      decrementProduct,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}