/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {FaStar} from 'react-icons/fa'
import Counter from '../Counter'
import CartContext from '../../context/CartContext'
import './index.css'

class FoodItemList extends Component {
  state = {quantity: 0}

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {
            addCartItem,
            incrementCartItemQuantity,
            decrementCartItemQuantity,
          } = value

          const {quantity} = this.state
          const {foodDetails} = this.props
          const {id, name, cost, imageUrl, rating} = foodDetails

          const addFood = () => {
            this.setState(
              prev => ({quantity: prev.quantity + 1}),
              addCartItem({...foodDetails, quantity: quantity + 1}),
            )
          }
          const increaseBtn = () => {
            this.setState(
              prev => ({quantity: prev.quantity + 1}),
              incrementCartItemQuantity(id),
            )
          }
          const decreaseBtn = () => {
            this.setState(
              prev => ({quantity: prev.quantity - 1}),
              decrementCartItemQuantity(id),
            )
          }
          return (
            <li testid="foodItem" className="food-list-align">
              <img src={imageUrl} alt="food item" className="food-image-size" />
              <div className="food-content-text">
                <h1 className="food-name">{name}</h1>
                <span>₹</span>
                <p className="price">{cost}</p>
                <p className="rating">
                  <FaStar color="#FFCC00" />
                  {rating}
                </p>
                {quantity === 0 ? (
                  <button
                    className="add-button"
                    type="button"
                    onClick={addFood}
                  >
                    Add
                  </button>
                ) : (
                  <Counter
                    quantity={quantity}
                    increaseBtn={increaseBtn}
                    decreaseBtn={decreaseBtn}
                  />
                )}
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default FoodItemList
