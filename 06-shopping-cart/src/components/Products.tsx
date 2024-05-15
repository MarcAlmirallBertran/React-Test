import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon, IncrementProductIcon, DecrementProductIcon } from './Icons'
import { useCart } from '../hooks/useCart'

export function Products({ products }: { products: any[]}) {
  const { cart, incrementProduct, decrementProduct, removeFromCart, addToCart } = useCart()

  const checkProductInCart = (product: any) => {
    return cart.some((item: any) => item.id === product.id)
  }

  return (
    <main className='products'>
      <ul>
        {products.slice(0, 10).map(product => {
          const isProductInCart = checkProductInCart(product)
          const quantity = cart.find((p: any) => p.id === product.id)?.quantity

          return (
            <li key={product.id}>
              <img
                src={product.thumbnail}
                alt={product.title}
              />
              <div>
                <strong>{product.title}</strong> - ${product.price}
              </div>
              <footer>
                {
                  isProductInCart
                    ? <>
                        <button
                          style={{ backgroundColor: 'red' }} onClick={() => {
                            quantity > 1
                              ? decrementProduct(product)
                              : removeFromCart(product)
                          }}
                        >
                          {
                            quantity > 1
                              ? <DecrementProductIcon />
                              : <RemoveFromCartIcon />
                          }
                        </button>
                        <small>
                          Quantity: {quantity}
                        </small>
                        <button style={{ backgroundColor: '#09f' }} onClick={() => incrementProduct(product)}>
                          <IncrementProductIcon />
                        </button>
                      </>
                    : <button style={{ backgroundColor: '#09f' }} onClick={() => addToCart(product)}>
                        <AddToCartIcon />
                      </button>
                }
              </footer>
            </li>
          )
        })}
      </ul>
    </main>
  )
}