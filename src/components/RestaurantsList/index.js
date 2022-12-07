/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {BsFilterRight} from 'react-icons/bs'
import {BiLeftArrow, BiRightArrow, BiSearchAlt2} from 'react-icons/bi'
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
    sortOption: sortByOptions[1].value,
    searchRestaurant: '',
    isAvaliable: false,
  }

  componentDidMount() {
    this.getRestaurantList()
  }

  getRestaurantList = async () => {
    this.setState({isLoading: true, isAvaliable: false})
    const {activePage, sortOption, searchRestaurant} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const limit = 9
    const offSet = (activePage - 1) * limit
    const apiUrl = `https://apis.ccbp.in/restaurants-list?search=${searchRestaurant}&offset=${offSet}&limit=${limit}&sort_by_rating=${sortOption}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const totalRestaurants = data.total
    const noOfPage = Math.ceil(totalRestaurants / limit)
    if (response.ok === true) {
      const formatedData = data.restaurants.map(each => ({
        id: each.id,
        cuisine: each.cuisine,
        name: each.name,
        imageUrl: each.image_url,
        rating: each.user_rating.rating,
        totalReviews: each.user_rating.total_reviews,
      }))
      this.setState({
        restaurantList: formatedData,
        isLoading: false,
        noOfPage,
        isAvaliable: false,
      })
    } else {
      this.setState({isLoading: false, isAvaliable: true})
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

  userSearch = event => {
    this.setState({searchRestaurant: event.target.value})
  }

  enterKey = event => {
    if (event.key === 'Enter') {
      this.getRestaurantList()
    }
  }

  searchbtn = () => this.getRestaurantList()

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
      searchRestaurant,
      isAvaliable,
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
          <div className="search-container">
            <input
              value={searchRestaurant}
              type="search"
              placeholder="Search Restaurants"
              className="search"
              onChange={this.userSearch}
              onKeyDown={this.enterKey}
            />
            <button
              type="button"
              className="search-btn"
              onClick={this.searchbtn}
            >
              <BiSearchAlt2 className="border" />
            </button>
          </div>
          {isLoading && (
            // eslint-disable-next-line react/no-unknown-property
            <div testid="restaurants-list-loader" className="loder-container">
              <Loader type="Bars" height="40" width="40" color="#f7931e" />
            </div>
          )}
          {isAvaliable && (
            <div className="loder-container">
              <h1>No Results!</h1>
            </div>
          )}
          {!isLoading && !isAvaliable && (
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
