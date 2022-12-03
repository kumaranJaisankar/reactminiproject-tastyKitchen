/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import FoodItemList from '../FoodItemList'
import Footer from '../Footer'
import Header from '../Header'
import './index.css'

class RestaurantDetails extends Component {
  state = {isLoading: false, bannerDetail: {}, foodDetails: []}

  componentDidMount() {
    this.getRestaurantFoodDetails()
  }

  getRestaurantFoodDetails = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const bannerDetail = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        imageUrl: data.image_url,
        location: data.location,
        name: data.name,
        rating: data.rating,
        reviewsCount: data.reviews_count,
      }
      const foodDetails = data.food_items.map(each => ({
        cost: each.cost,
        foodType: each.food_type,
        id: each.id,
        imageUrl: each.image_url,
        name: each.name,
        rating: each.rating,
      }))
      this.setState({isLoading: false, foodDetails, bannerDetail})
    }
  }

  render() {
    const {isLoading, bannerDetail, foodDetails} = this.state
    const {
      name,
      costForTwo,
      cuisine,
      imageUrl,
      location,
      rating,
      reviewsCount,
    } = bannerDetail
    return (
      <>
        <Header />
        {isLoading && (
          <div
            testid="restaurant-details-loader"
            className="restaurant-details-loader"
          >
            <Loader type="Bars" height="40" width="40" color="#f7931e" />
          </div>
        )}
        {!isLoading && (
          <>
            <div className="restaurant-banner">
              <div className="restaurant-detail-banner">
                <img
                  src={imageUrl}
                  alt="restaurant"
                  className="restaurant-img-size"
                />
              </div>
              <div className="content-detailss">
                <h1 className="restur-name">{name}</h1>
                <p className="cuisienee">{cuisine}</p>
                <p className="cuisienee">
                  <IoLocationSharp size={20} color="white" />
                  {location}
                </p>
                <div className="rating-detail-ca">
                  <div>
                    <p className="cuisienee">
                      <AiFillStar color="white" /> {rating}
                    </p>
                    <p className="cuisienee cu">{reviewsCount}+ Ratings</p>
                  </div>
                  <hr className="hr" />
                  <div>
                    <p className="cuisienee">₹{costForTwo}</p>
                    <p className="cuisienee cu">Cost for two</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="food-detail-container">
              <ul className="each-food-list">
                {foodDetails.map(each => (
                  <FoodItemList key={each.id} foodDetails={each} />
                ))}
              </ul>
            </div>
          </>
        )}

        <Footer />
      </>
    )
  }
}
export default RestaurantDetails
