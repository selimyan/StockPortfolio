import React, { Component } from 'react'

export default class TransactionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ticker: '',
      quantity: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange() {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { ticker, quantity } = this.state
    this.props.buyShares({ ticker, quantity: +quantity })
    this.setState({ ticker: '', quantity: '' })
  }

  render() {
    const { ticker, quantity } = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              className='form-control'
              name='ticker'
              type='text'
              placeholder='Ticker'
              value={ticker}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              className='form-control'
              name='quantity'
              type='number'
              placeholder='Quantity'
              min='1'
              value={quantity}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button
              type='submit'
              className='btn btn-secondary form-control'
            >
              Buy
            </button>
          </div>
        </form>
      </div>
    )
  }
}