import React, { Component } from 'react'
import axios from 'axios'
import TransactionForm from './TransactionForm'
import { stringifyTickers, getCurrentValue, createPortfolio } from './utils'

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

  async componentDidMount() {
    try {
      const { user } = this.props
      const { data } = await axios.get('/api/portfolio')
      const portfolio = await this.getCurrentPortfolio(data)
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
    const { data } = await axios.post('/api/transactions', purchaseInfo)
    console.log('data', data)
    if (data.error) this.setState({ error: data.error })
    else {

    }
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