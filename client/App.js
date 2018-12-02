import React, { Component } from "react"
import axios from 'axios'
import { Route } from 'react-router-dom'
import Login from './components/Login'
import Navbar from './components/Navbar'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      error: ''
    }
    this.login = this.login.bind(this)
    this.register = this.register.bind(this)
    this.logout - this.logout.bind(this)
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get('/auth/me')
      this.setState({
        user: data,
        error: ''
      })
    } catch (error) {
      console.log('Error getting the user', error)
    }
  }

  async login(user) {
    try {
      const { data } = await axios.post('/auth/login', user)
      if (data.error) this.setState({ error: data.error })
      else this.setState({ user: data, error: '' })
    } catch (error) {
      console.log('Error loggin in the user', error)
    }
  }

  async register(user) {
    try {
      const { data } = await axios.post('/auth/signup', user)
      if (data.error) this.setState({ error: data.error })
      else this.setState({ user: data, error: '' })
    } catch (error) {
      console.log('Error registering the user', error)
    }
  }

  async logout() {
    try {
      await axios.post('/auth/logout')
    } catch (error) {
      console.log('Error loggin out the user', error)
    }
  }

  render() {
    const { user, error } = this.state

    return (
      <div>
        {
          user.id ?
            <Navbar logout={this.logout} />
            :
            <div>
              <Login
                error={error}
                login={this.login}
                register={this.register}
              />
            </div>
        }
      </div>
    )
  }
}