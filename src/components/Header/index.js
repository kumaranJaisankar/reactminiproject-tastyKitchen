import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {BiMenu} from 'react-icons/bi'
import {IoCloseSharp} from 'react-icons/io5'

import './index.css'

class Header extends Component {
  state = {menuOpen: false}

  logoutBtn = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  exitMenu = () => {
    const {history} = this.props
    console.log(history)
    this.setState({menuOpen: false})
  }

  optionColor = path => {
    const {history} = this.props
    const currentPath = history.location.pathname
    if (currentPath === path) {
      return '#F7931E'
    }
    return '#334155'
  }

  openMenu = () => {
    this.setState({menuOpen: true})
  }

  render() {
    const {menuOpen} = this.state
    return (
      <>
        <nav className="nav-bar">
          <div className="logo-container">
            <img
              src="https://res.cloudinary.com/dtbarluca/image/upload/v1669706558/Frame_274_hsoezn.png"
              alt="website logo"
              className="logo-size"
            />
            <h1 className="companey-name-header">Tasty Kitchen</h1>
          </div>
          <ul className="nav-link-list-desktop">
            <Link to="/" className="link-style ">
              <li
                className="list-style li"
                style={{color: this.optionColor('/')}}
              >
                Home
              </li>
            </Link>
            <Link to="/cart" className="link-style ">
              <li
                className="list-style li"
                style={{color: this.optionColor('/cart')}}
              >
                Cart
              </li>
            </Link>
            <li>
              <button
                type="button"
                className="logout-btn"
                onClick={this.logoutBtn}
              >
                Logout
              </button>
            </li>
          </ul>
          <button
            type="button"
            className="mobile-view-menu"
            onClick={this.openMenu}
          >
            <BiMenu size={24} />
          </button>
        </nav>
        {menuOpen && (
          <div className="mobile-view-menu-options">
            <ul className="nav-link-list-mobile">
              <Link to="/" className="link-style ">
                <li
                  className="list-style li"
                  style={{color: this.optionColor('/')}}
                >
                  Home
                </li>
              </Link>
              <Link to="/cart" className="link-style ">
                <li
                  className="list-style li"
                  style={{color: this.optionColor('/cart')}}
                >
                  Cart
                </li>
              </Link>
              <li>
                <button
                  type="button"
                  className="logout-btn"
                  onClick={this.logoutBtn}
                >
                  Logout
                </button>
              </li>
            </ul>
            <button
              type="button"
              className="close-menu"
              onClick={this.exitMenu}
            >
              <IoCloseSharp size={22} />
            </button>
          </div>
        )}
      </>
    )
  }
}
export default withRouter(Header)
