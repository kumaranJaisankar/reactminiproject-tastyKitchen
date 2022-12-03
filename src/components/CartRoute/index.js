import {Component} from 'react'
import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import CartCheckout from '../CartCheckout'
import CartItem from '../CartItem'
import Header from '../Header'
import Footer from '../Footer'
import CartSummery from '../CartSummery'
import './index.css'

class CartRoute extends Component {
  state = {isChecked: false}

  orderCheckout = () => {
    this.setState({isChecked: true})
  }

  render() {
    const {isChecked} = this.state

    return (
      <>
        <Header />
        {isChecked ? (
          <CartCheckout />
        ) : (
          <CartContext.Consumer>
            {value => {
              const {cartList, removeAllCartItems} = value
              const isContainList = cartList.length === 0
              const removeAllItem = () => {
                removeAllCartItems()
              }
              return (
                <>
                  {isContainList ? (
                    <div className="empty-list-container">
                      <img
                        src="https://res.cloudinary.com/dtbarluca/image/upload/v1669988553/OBJECTS_xmfrmp.png"
                        alt="empty cart"
                        className="empty-cart-img"
                      />
                      <h1 className="no-item">No Order Yet!</h1>
                      <p className="para-empty">
                        Your cart is empty. Add something from the menu.
                      </p>
                      <Link to="/">
                        <button type="button" className="home-btn">
                          Order Now
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div className="cart-list-items-container">
                      <div className="container-cart">
                        <button
                          type="button"
                          className="remove-all"
                          onClick={removeAllItem}
                        >
                          Remove all
                        </button>
                        <ul className="cart-list">
                          <li className="item-quantity-price">
                            <h6>Item</h6>
                            <h6>Quantity</h6>
                            <h6>Price</h6>
                          </li>
                          {cartList.map(each => (
                            <CartItem key={each.id} cartListDetail={each} />
                          ))}
                        </ul>
                        <CartSummery orderCheckout={this.orderCheckout} />
                      </div>
                    </div>
                  )}
                </>
              )
            }}
          </CartContext.Consumer>
        )}
        <Footer />
      </>
    )
  }
}

export default CartRoute
