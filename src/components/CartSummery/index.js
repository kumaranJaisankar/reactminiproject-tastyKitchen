import CartContext from '../../context/CartContext'
import './index.css'

const CartSummery = props => {
  const {orderCheckout} = props

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, removeAllCartItems} = value
        const totalAmount = cartList.map(each => each.cost * each.quantity)
        const currentToatal = totalAmount.reduce((a, b) => a + b)
        const checkOut = () => {
          orderCheckout()
          removeAllCartItems()
        }
        return (
          <div className="order-summery">
            <h1 className="total-order">Order Total : </h1>
            <div>
              <h1 className="total-order">₹{currentToatal}</h1>
              <button className="checkout-btn" type="button" onClick={checkOut}>
                Place Order
              </button>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummery
