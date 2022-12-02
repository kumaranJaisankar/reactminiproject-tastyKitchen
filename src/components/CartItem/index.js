/* eslint-disable react/no-unknown-property */
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {incrementCartItemQuantity, decrementCartItemQuantity} = value
      const {cartListDetail} = props
      const {id, quantity, cost, imageUrl, name} = cartListDetail
      const onDecrement = () => {
        decrementCartItemQuantity(id)
      }
      const onIncrement = () => {
        incrementCartItemQuantity(id)
      }
      return (
        <li testid="cartItem" className="item-quantity-price">
          <div className="product">
            <img src={imageUrl} alt={name} className="cart-image" />
            <h1 className="name">{name}</h1>
          </div>
          <div className="counter-count">
            <button
              testid="decrement-quantity"
              type="button"
              onClick={onDecrement}
            >
              -
            </button>
            <div testid="item-quantity">{quantity}</div>
            <button
              testid="increment-quantity"
              type="button"
              onClick={onIncrement}
            >
              +
            </button>
          </div>
          <p className="total-amount">{cost * quantity}</p>
        </li>
      )
    }}
  </CartContext.Consumer>
)
export default CartItem
