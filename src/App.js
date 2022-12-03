import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import CartContext from './context/CartContext'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import RestaurantDetails from './components/RestaurantDetails'
import CartRoute from './components/CartRoute'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import './App.css'

const itemFromLocalStorage = () => {
  const stringifiedCartList = localStorage.getItem('cartData')
  const parsedCartList = JSON.parse(stringifiedCartList)
  if (parsedCartList === null) {
    return []
  }
  return parsedCartList
}

class App extends Component {
  state = {cartList: itemFromLocalStorage()}

  removeCartItem = id => {
    const {cartList} = this.state
    const newCartList = cartList.filter(eachValue => eachValue.id !== id)
    this.setState({cartList: newCartList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const newCartList = cartList.map(eachValue => {
      if (eachValue.id === id) {
        return {...eachValue, quantity: eachValue.quantity + 1}
      }
      return eachValue
    })
    this.setState({cartList: newCartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const cartItem = cartList.filter(eachValue => eachValue.id === id)
    const {quantity} = cartItem[0]
    if (quantity > 1) {
      const newCartList = cartList.map(eachValue => {
        if (eachValue.id === id) {
          return {...eachValue, quantity: eachValue.quantity - 1}
        }
        return eachValue
      })
      this.setState({cartList: newCartList})
    } else {
      this.removeCartItem(id)
    }
  }

  removeAllCartItems = () => this.setState({cartList: []})

  addCartItem = product => {
    const {id, quantity} = product
    const {cartList} = this.state
    const isTrue = cartList.filter(eachValue => eachValue.id === id)
    if (isTrue.length > 0) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === id) {
            return {...eachItem, quantity: eachItem.quantity + quantity}
          }
          return eachItem
        }),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  render() {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))

    return (
      <CartContext.Provider
        value={{
          cartList,
          removeAllCartItems: this.removeAllCartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <>
          <Switch>
            <Route exact path="/login" component={LoginRoute} />
            <ProtectedRoute exact path="/" component={HomeRoute} />
            <ProtectedRoute exact path="/cart" component={CartRoute} />
            <ProtectedRoute
              exact
              path="/restaurant/:id"
              component={RestaurantDetails}
            />
            <Route path="/bad-path" component={NotFound} />
            <Redirect to="/bad-path" />
          </Switch>
        </>
      </CartContext.Provider>
    )
  }
}

export default App
