import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import './App.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class App extends Component {
  state = {cartItem: []}

  render() {
    return (
      <>
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
        </Switch>
      </>
    )
  }
}

export default App
