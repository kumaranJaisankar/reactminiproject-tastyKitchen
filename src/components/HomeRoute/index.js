import Header from '../Header'
import Footer from '../Footer'
import DiscountSlider from '../DiscountSlider'
import RestaurantsList from '../RestaurantsList'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="mobile-offer-view">
      <DiscountSlider />
    </div>
    <div className="main-resturant-container">
      <div className="resturant-container">
        <div className="desktop-offer-view">
          <DiscountSlider />
        </div>
        <RestaurantsList />
      </div>
    </div>
    <Footer />
  </>
)
export default Home
