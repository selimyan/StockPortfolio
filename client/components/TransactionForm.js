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

  async handleSubmit(event) {
    event.preventDefault()
    const { ticker, quantity } = this.state
    const bought = await this.props.buyShares({ ticker, quantity: +quantity })
    console.log(bought)
    if (bought) this.setState({ ticker: '', quantity: '' })
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