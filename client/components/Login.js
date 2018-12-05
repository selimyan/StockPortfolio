import React, { Component } from "react"

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      newUser: false
    }
    this.toggleAuth = this.toggleAuth.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  toggleAuth(event) {
    event.preventDefault()
    this.props.clearError()
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
      <div className='jumbotron mh-100 row'>
        <div className='col'></div>
        <div className='col'>
          <form onSubmit={this.handleSubmit} className='mt-5 w-100'>
            {
              newUser &&
              <div>
                <input
                  className='form-control'
                  name='name'
                  placeholder='name'
                  type='text'
                  value={name}
                  onChange={this.handleChange}
                />
              </div>
            }
            <div>
              <input
                className='form-control'
                name='email'
                placeholder='email'
                type='text'
                value={email}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input
                className='form-control'
                name='password'
                placeholder='password'
                type='password'
                value={password}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <button
                type='submit'
                className='btn btn-secondary form-control'
              >
                {buttonName}
              </button>
            </div>
            {error && <p className='text-danger'>{error}</p>}
          </form>
          <div>
            {newUser
              ? <p>Already registered? <a href='' onClick={this.toggleAuth}>Login</a></p>
              : <p>Not registered? <a href='' onClick={this.toggleAuth}>Register</a></p>
            }
          </div>
        </div>
        <div className='col'></div>
      </div>
    )
  }
}