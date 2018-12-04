import React, { Component } from 'react'

export default class TransactionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ticker: '',
      quantity: 0
    }
  }

  render() {
    return (
      <div>
        <form >
          <div>
            <input
              name='ticker'
              type='text'
              placeholder='Ticker'
            />
          </div>
          <div>
            <input
              name='quantity'
              type='number'
              placeholder='Quantity'
              min='1'
            />
          </div>
          <div>
            <button type='submit'> Buy </button>
          </div>
        </form>
      </div>
    )
  }
}