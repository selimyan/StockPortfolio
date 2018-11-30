import React, { Component } from "react"
import axios from 'axios'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
    }
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/auth/me')
      const user = res.data ? { ...res.data, isLoggedIn: true } : {}
      this.setState({ user })
    } catch (error) {
      console.log('Error getting the user', error)
    }
  }

  render() {
    const { user } = this.state

    return (
      <div>
        {
          user.isLoggedIn ?
            <h1>We need a navbar and user info here</h1>
            : <h1>Let's sign you in</h1>
        }
      </div>
    )
  }
}