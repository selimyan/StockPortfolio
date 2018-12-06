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
      <div className='container my-5 pt-5'>
        <h1 className='mb-3'>Transactions</h1>

        <table className='table'>
          <thead>
            <tr>
              <th> Stock </th>
              <th> Shares </th>
              <th> Price </th>
              <th> Date </th>
            </tr>
          </thead>
          <tbody>
            {this.state.transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td>{transaction.ticker.toUpperCase()}</td>
                  <td>{transaction.quantity}</td>
                  <td>${(transaction.price / 100).toFixed(2)}</td>
                  <td>{getDate(transaction.createdAt)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

      </div>
    )
  }
}