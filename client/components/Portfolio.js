import React, { Component } from 'react'
import axios from 'axios'
import TransactionForm from './TransactionForm'
import { stringifyTickers, getCurrentValue, createPortfolio, getStocks } from './utils'

export default class Portfolio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      value: 0,
      portfolio: [],
      error: ''
    }
    this.buyShares = this.buyShares.bind(this)
  }

  componentDidMount() {
    this.fetchPortfolio()
  }

  async fetchPortfolio() {
    try {
      const { user } = this.props
      const { data } = await axios.get('/api/transactions')
      const stocks = getStocks(data)
      const portfolio = await this.getCurrentPortfolio(stocks)
      const value = getCurrentValue(portfolio)
      this.setState({
        user,
        portfolio,
        value
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getCurrentPortfolio(stocks) {
    try {
      const tickers = stringifyTickers(stocks)
      const { data } = await axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${tickers}&types=quote`)
      return createPortfolio(stocks, data)
    } catch (error) {
      console.log(error)
    }
  }

  async buyShares(purchaseInfo) {
    try {
      const { data } = await axios.post('/api/transactions', purchaseInfo)
      let error
      console.log('data', data)
      if (data === 'Unknown symbol') error = data
      if (data.error) error = data.error
      if (error) this.setState({ error })
      else this.fetchPortfolio()
    } catch (error) {
      console.log('caught', error)
    }
  }

  render() {
    const { value, portfolio, user, error } = this.state
    return (
      <div className='container my-5 pt-5'>
        <h1 className='mb-3'>Portfolio (${value.toFixed(2)})</h1>
        <div className='row'>
          <div className='col-sm-8 mx-auto'>
            <div>
              <table className='table'>
                <thead>
                  <tr>
                    <th> Stock </th>
                    <th> Shares </th>
                    <th> Current Price </th>
                    <th> Current Value </th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.map((stock) => {
                    return (
                      <tr key={stock.ticker}>
                        <td>{stock.ticker}</td>
                        <td>{stock.quantity}</td>
                        <td>${stock.price}</td>
                        <td>${(stock.value).toFixed(2)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className='col-sm-4'>
            <h2>Cash - ${(user.cash / 100).toFixed(2)}</h2>
            <TransactionForm buyShares={this.buyShares} />
            {error &&
              <h4> {error} </h4>
            }
          </div>
        </div>
      </div>
    )
  }
}