import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', isError: false, errorMsg: ''}

  successLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 60})
    history.replace('/')
  }

  userLoginBtn = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.successLogin(data.jwt_token)
    } else {
      this.setState({isError: true, errorMsg: data.error_msg})
    }
  }

  inputUserName = event => {
    this.setState({username: event.target.value})
  }

  inputPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, isError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="login-container">
          <img
            src="https://res.cloudinary.com/dtbarluca/image/upload/v1669706256/Rectangle_1457_vqsdll.png"
            alt="website loin"
            className="mobile-view-image"
          />
          <div className="form-container">
            <form className="login-form" onSubmit={this.userLoginBtn}>
              <div className="logo-assembly">
                <img
                  src="https://res.cloudinary.com/dtbarluca/image/upload/v1669706558/Frame_274_hsoezn.png"
                  alt="website logo"
                  className="logo-size"
                />
                <h1 className="companey-name">Tasty Kitchens</h1>
              </div>
              <h1 className="login-text-mob">Login</h1>
              <div className="input-container">
                <label htmlFor="username">USERNAME</label>
                <input
                  onChange={this.inputUserName}
                  id="username"
                  type="text"
                  value={username}
                  placeholder="Username"
                  className="input-style"
                />
              </div>
              <div className="input-container">
                <label htmlFor="password">PASSWORD</label>
                <input
                  onChange={this.inputPassword}
                  id="password"
                  type="password"
                  value={password}
                  placeholder="Password"
                  className="input-style"
                />
                {isError && <p className="error-msg">{errorMsg}</p>}
              </div>
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
          </div>
          <img
            src="https://res.cloudinary.com/dtbarluca/image/upload/v1669705689/Rectangle_1456_evvwmw.png"
            alt="website login"
            className="desktop-view-image"
          />
        </div>
      </>
    )
  }
}
export default LoginRoute
