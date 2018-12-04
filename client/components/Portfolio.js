import React, { Component } from 'react'
import axios from 'axios'
import TransactionForm from './TransactionForm'
import { stringifyTickers } from './utils'

export default class Portfolio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      value: 0,
      portfolio: [],
    }
    this.buyShares = this.buyShares.bind(this)
  }

  async componentDidMount() {
    try {
      const { user } = this.props
      const { data } = await axios.get('/api/portfolio')
      const portfolio = await this.getCurrentInfo(data)
      const value = this.getCurrentValue(portfolio)
      this.setState({
        user,
        portfolio,
        value
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getCurrentInfo(stocks) {
    try {
      let tickers = stringifyTickers(stocks)
      const { data } = await axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${tickers}&types=quote`)
      let portfolio = []
      for (let i = 0; i < stocks.length; i++) {
        let currentStock = stocks[i]
        let item = {
          ticker: currentStock.ticker,
          quantity: currentStock.quantity,
          price: data[currentStock.ticker].quote.latestPrice,
          value: data[currentStock.ticker].quote.latestPrice * currentStock.quantity
        }
        portfolio.push(item)
      }
      return portfolio
    } catch (error) {
      console.log(error)
    }
  }

  getCurrentValue(portfolio) {
    let total = 0
    for (let i = 0; i < portfolio.length; i++) {
      let stock = portfolio[i]
      total += stock.value
    }
    return total
  }

  async buyShares(purchaseInfo) {
    console.log('purchase info', purchaseInfo)
    const { data } = await axios.post('/api/transactions', purchaseInfo)
    console.log('data', data)
  }

  render() {
    const { value, portfolio, user } = this.state
    return (
      <div>
        <div>
          <h1>Portfolio (${value.toFixed(2)})</h1>
          <div>
            {portfolio.map((stock) => {
              return (
                <div key={stock.ticker}>
                  <div>{stock.ticker} - {stock.quantity} Shares @ {stock.price}</div>
                  <div>${(stock.value).toFixed(2)}</div>
                </div>
              )
            })}
          </div>
        </div>
        <div>
          <h2>Cash - ${(user.cash / 100).toFixed(2)}</h2>
          <TransactionForm buyShares={this.buyShares} />
        </div>
      </div>
    )
  }
}