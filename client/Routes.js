import React, { Component } from "react"
import { Route, Switch } from 'react-router-dom'
import Portfolio from './components/Portfolio'
import Transactions from './components/Transactions'

export default class Routes extends Component {
  render() {
    const { user } = this.props

    return (
      user.id &&
      <Switch>
        <Route
          exact path='/portfolio'
          render={(props) => <Portfolio {...props} user={user} />}
        />
        <Route
          exact path='/transactions'
          render={(props) => <Transactions {...props} user={user} />}
        />
      </Switch>
    )
  }
}