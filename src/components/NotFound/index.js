import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found">
    <img
      src="https://res.cloudinary.com/dtbarluca/image/upload/v1669999414/erroring_1_svootq.png"
      alt="not found"
      className="not-image"
    />
    <h1>Page Not Found</h1>
    <p className="not-text">
      We are sorry, the page you requested could not be found.Please go back to
      the homepage
    </p>
    <Link to="/">
      <button className="checkout-btn btn" type="button">
        Home Page
      </button>
    </Link>
  </div>
)
export default NotFound
