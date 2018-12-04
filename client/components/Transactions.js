import React, { Component } from 'react'
import axios from 'axios'
import { getDate } from './utils'

export default class Transactions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: []
    }
  }

  async componentDidMount() {
    const { data } = await axios.get('/api/transactions')
    this.setState({ transactions: data })
  }

  render() {
    return (
      <div>
        <h1>Transactions</h1>
        <div>
          {this.state.transactions.map((transaction) => {
            return (
              <div key={transaction.id}>
                {transaction.ticker} - {transaction.quantity} Shares
              @ ${transaction.price} | on {getDate(transaction.createdAt)}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}