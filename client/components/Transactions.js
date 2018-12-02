import React, { Component } from 'react'

export default class Transactions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  render() {
    return (
      <h1>Transactions</h1>
    )
  }
}