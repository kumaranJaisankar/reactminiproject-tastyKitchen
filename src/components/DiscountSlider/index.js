import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

class DiscountSlider extends Component {
  state = {discountList: [], isLoading: false}

  componentDidMount() {
    this.getOfferDetails()
  }

  getOfferDetails = async () => {
    this.setState({isLoading: true})
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const formatedData = data.offers.map(each => ({
      id: each.id,
      imageUrl: each.image_url,
    }))

    if (response.ok === true) {
      this.setState({discountList: formatedData, isLoading: false})
    }
  }

  render() {
    const {discountList, isLoading} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
    }
    return (
      <>
        {isLoading && (
          // eslint-disable-next-line react/no-unknown-property
          <div testid="restaurants-offers-loader" className="loder-container">
            <Loader type="Bars" height="40" width="40" color="#f7931e" />
          </div>
        )}
        {!isLoading && (
          <ul className="offer-list">
            <Slider {...settings} className="carousal">
              {discountList.map(eachImage => (
                <li className="liss" key={eachImage.id}>
                  <img
                    src={eachImage.imageUrl}
                    alt="offer"
                    className="offer-image"
                  />
                </li>
              ))}
            </Slider>
          </ul>
        )}
      </>
    )
  }
}
export default DiscountSlider
