import { useId, } from "react";
import { CartIcon, ClearCartIcon, DecrementProductIcon, IncrementProductIcon, MoodWinkIcon, RemoveFromCartIcon } from "./Icons";
import './Cart.css'
import { useCart } from "../hooks/useCart";

function CartItem ({ product, incrementProduct, decrementProduct, removeFromCart}) {
  return (
    <li>
      <img src={product.thumbnail} alt={product.title}  />
      <div>
        <strong>{product.title}</strong> - ${product.price}
      </div>
      <footer>
        <button
          style={{ backgroundColor: 'red' }} onClick={
            product.quantity > 1
              ? decrementProduct
              : removeFromCart
          }
        >
          {
            product.quantity > 1
              ? <DecrementProductIcon />
              : <RemoveFromCartIcon />
          }
        </button>
        <small>
          Quantity: {product.quantity}
        </small>
        <button style={{ backgroundColor: '#09f' }} onClick={incrementProduct}>
          <IncrementProductIcon />
        </button>
      </footer>
    </li>
  )
}

export function Cart() {
  const { cart, clearCart, incrementProduct, decrementProduct, removeFromCart } = useCart()
  const cartCheckboxId = useId()
  
  return (
    <>
      <label className="cart-button" htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input type="checkbox" id={cartCheckboxId} hidden />

      <aside className="cart">
        <ul>
          {
            cart.length > 0
              ? cart.map((product: any) => (
                <CartItem 
                  key={product.id}
                  product={product}
                  incrementProduct={() => incrementProduct(product)}
                  decrementProduct={() => decrementProduct(product)}
                  removeFromCart={() => removeFromCart(product)}
                />
              ))
              : <strong>Your cart is empty buy something <MoodWinkIcon /></strong>
          }
        </ul>

        {
          cart.length > 0 &&
          <button onClick={() => clearCart()}>
            <ClearCartIcon />
          </button>
        }
      </aside>
    </>
  )
}