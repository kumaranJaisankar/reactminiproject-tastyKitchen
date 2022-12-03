/* eslint-disable react/no-unknown-property */
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantsItem = props => {
  const {restaurantDetails} = props
  const {id, cuisine, name, imageUrl, rating, totalReviews} = restaurantDetails
  return (
    <Link to={`/restaurant/${id}`} className="rest-link">
      <li testid="restaurant-item" className="list-rest-style">
        <img src={imageUrl} alt="restaurant" className="rest-image-size" />
        <div className="resturant-details-card">
          <h1 className="resturant-name">{name}</h1>
          <p className="cuisine">{cuisine}</p>
          <div className="rating-cont">
            <AiFillStar color="#FFCC00" />
            <p className="rate-ing">{rating}</p>
            <p className="ratings">({totalReviews} ratings)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantsItem
