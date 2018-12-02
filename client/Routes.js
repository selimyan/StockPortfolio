import React, { Component } from "react"
import { Route, Switch } from 'react-router-dom'
import Portfolio from './components/Portfolio'
import Transactions from './components/Transactions'

export default class Routes extends Component {
  render() {
    return (
      this.props.user.id &&
      <Switch>
        <Route exact path='/portfolio' component={Portfolio} />
        <Route exact path='/transactions' component={Transactions} />
      </Switch>
    )
  }
}