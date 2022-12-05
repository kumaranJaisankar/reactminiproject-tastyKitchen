/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {BsFilterRight} from 'react-icons/bs'
import {BiLeftArrow, BiRightArrow} from 'react-icons/bi'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import RestaurantsItem from '../RestaurantsItem'

import './index.css'

const sortByOptions = [
  {
    id: 1,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class RestaurantsList extends Component {
  state = {
    restaurantList: [],
    isLoading: false,
    noOfPage: 0,
    activePage: 1,
    sortOption: sortByOptions[0].value,
  }

  componentDidMount() {
    this.getRestaurantList()
  }

  getRestaurantList = async () => {
    this.setState({isLoading: true})
    const {activePage, sortOption} = this.state
    const offSet = (activePage - 1) * 9
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?search=&offset=${offSet}&limit=9&sort_by_rating=${sortOption}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const totalRestaurants = data.total
    const noOfPage = Math.ceil(totalRestaurants / 9)
    if (response.ok === true) {
      const formatedData = data.restaurants.map(each => ({
        id: each.id,
        cuisine: each.cuisine,
        name: each.name,
        imageUrl: each.image_url,
        rating: each.user_rating.rating,
        totalReviews: each.user_rating.total_reviews,
      }))
      this.setState({restaurantList: formatedData, isLoading: false, noOfPage})
    }
  }

  sortingOption = event => {
    this.setState({sortOption: event.target.value}, this.getRestaurantList)
  }

  previousPage = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prev => ({activePage: prev.activePage - 1}),
        this.getRestaurantList,
      )
    }
  }

  nextPage = () => {
    const {activePage, noOfPage} = this.state
    if (activePage < noOfPage) {
      this.setState(
        prev => ({activePage: prev.activePage + 1}),
        this.getRestaurantList,
      )
    }
  }

  render() {
    const {
      restaurantList,
      isLoading,
      sortOption,
      activePage,
      noOfPage,
    } = this.state

    return (
      <div className="popluar-resturant-container">
        <h1 className="popular-resturant-title">Popular Restaurants</h1>
        <div className="filter-container">
          <p className="about-this-text">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <div className="filter-part">
            <BsFilterRight />
            <p className="sort-text">Sort by</p>
            <select
              className="sort-option"
              value={sortOption}
              onChange={this.sortingOption}
            >
              {sortByOptions.map(each => (
                <option key={each.id} value={each.value}>
                  {each.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
        <hr className="line-break" />
        <div className="resturant-card-container">
          {isLoading && (
            // eslint-disable-next-line react/no-unknown-property
            <div testid="restaurants-list-loader" className="loder-container">
              <Loader type="Bars" height="40" width="40" color="#f7931e" />
            </div>
          )}
          {!isLoading && (
            <ul className="restaurant-cart-list">
              {restaurantList.map(each => (
                <RestaurantsItem key={each.id} restaurantDetails={each} />
              ))}
            </ul>
          )}
        </div>
        <div className="pagination-container">
          <button
            testid="pagination-left-button"
            type="button"
            className="pagination-btn"
            onClick={this.previousPage}
          >
            <BiLeftArrow size={20} />
          </button>
          <h1 className="page-no">
            <span testid="active-page-number">{activePage}</span> of {noOfPage}
          </h1>
          <button
            testid="pagination-right-button"
            type="button"
            className="pagination-btn"
            onClick={this.nextPage}
          >
            <BiRightArrow size={20} />
          </button>
        </div>
      </div>
    )
  }
}
export default RestaurantsList
