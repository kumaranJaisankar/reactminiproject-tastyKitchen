import {Link} from 'react-router-dom'
import {AiFillCheckCircle} from 'react-icons/ai'
import './index.css'

const CartCheckout = () => (
  <div className="thankyou-card">
    <AiFillCheckCircle size={25} color="#22C55E" />
    <h1 className="payment-success">Payment Successful</h1>
    <p className="greeting-text">
      Thank you for ordering Your payment is successfully completed.
    </p>
    <Link to="/">
      <button type="button" className="checkout-btn btn">
        Go To Home Page
      </button>
    </Link>
  </div>
)

export default CartCheckout
