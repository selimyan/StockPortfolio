import React, { Component } from "react"
import { Route, Link } from 'react-router-dom'
import Login from './Login'

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      error: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.register(this.state)
  }

  render() {
    const { name, email, password } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor='name'>
            <small> Name </small>
          </label>
          <input
            name='name'
            type='text'
            value={name}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor='email'>
            <small> Email </small>
          </label>
          <input
            name='email'
            type='text'
            value={email}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor='password'>
            <small> Password </small>
          </label>
          <input
            name='password'
            type='text'
            value={password}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <button type='submit'> Register </button>
          <p>Already registered?</p><Link to='/login'>Login</Link>
          {/* <Route path='/login' render={() => <Login />} /> */}
        </div>
        {this.props.error && <p>{this.props.error}</p>}
      </form>
    )
  }
}