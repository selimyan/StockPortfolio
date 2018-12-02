import React, { Component } from 'react'

export default class Portfolio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  render() {
    console.log('user', this.props)
    return (
      <h1>Portfolio</h1>
    )
  }
}