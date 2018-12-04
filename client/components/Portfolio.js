import React, { Component } from 'react'
import axios from 'axios'
import { stringifyTickers } from './utils'

export default class Portfolio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      value: 0,
      portfolio: [],
    }
  }

  async componentDidMount() {
    try {
      const { user } = this.props
      const { data } = await axios.get('/api/portfolio')
      const portfolio = await this.getCurrentInfo(data)
      const value = this.getCurrentValue(portfolio)
      console.log('---value', value)
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
    console.log('in value portfolio', portfolio)
    let total = 0
    for (let i = 0; i < portfolio.length; i++) {
      let stock = portfolio[i]
      console.log('ticker', stock.value)
      total += stock.value
    }
    console.log('tooote', total)
    return total
  }

  render() {
    const { value, portfolio, user } = this.state
    console.log('-----', portfolio)
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
        </div>
      </div>
    )
  }
}