import React, { Component } from "react"

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      error: '',
      newUser: false
    }
    this.toggleAuth = this.toggleAuth.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  toggleAuth(event) {
    event.preventDefault()
    this.setState({
      newUser: !this.state.newUser
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()

    const { login, register } = this.props
    const { email, password, name, newUser } = this.state

    if (newUser) {
      await register({ name, email, password })
    }
    else {
      await login({ email, password })
    }
  }

  render() {
    const { name, email, password, newUser } = this.state
    const { error } = this.props
    const buttonName = newUser ? 'Register' : 'Login'

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {
            newUser &&
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
          }
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
              type='password'
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button type='submit'> {buttonName} </button>
          </div>
          {error && <p>{error}</p>}
        </form>
        <div>
          {newUser
            ? <p>Already registered? <a href='' onClick={this.toggleAuth}>Login</a></p>
            : <p>Not registered? <a href='' onClick={this.toggleAuth}>Register</a></p>
          }
        </div>
      </div>
    )
  }
}