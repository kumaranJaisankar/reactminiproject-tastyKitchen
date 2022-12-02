/* eslint-disable react/no-unknown-property */

import './index.css'

const Counter = props => {
  const {quantity, increaseBtn, decreaseBtn} = props

  const onIncrement = () => {
    increaseBtn()
  }

  const onDecrement = () => {
    decreaseBtn()
  }

  return (
    <div className="counter-count">
      <button testid="decrement-count" type="button" onClick={onDecrement}>
        -
      </button>
      <div testid="active-count">{quantity}</div>
      <button testid="increment-count" type="button" onClick={onIncrement}>
        +
      </button>
    </div>
  )
}

export default Counter
