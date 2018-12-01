import React, { Component } from "react"

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    await this.props.login(this.state)
  }

  render() {
    const { email, password } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
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
          <button type='submit'> Login </button>
        </div>
        {this.props.error && <p>{this.props.error}</p>}
      </form>
    )
  }
}