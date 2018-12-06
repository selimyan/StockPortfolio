import React, { Component } from 'react'
import axios from 'axios'
import TransactionForm from './TransactionForm'
import Stock from './Stock'
import { stringifyTickers, getCurrentTotalValue, createPortfolio, getStocks } from './utils'

export default class Portfolio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      value: 0,
      portfolio: [],
      message: ''
    }
    this.buyShares = this.buyShares.bind(this)
  }

  componentDidMount() {
    this.fetchPortfolio()
  }

  async fetchPortfolio() {
    try {
      const { user } = this.props
      this.setState({ user })
      const { data } = await axios.get('/api/transactions')
      if (data.length) {
        const stocks = getStocks(data)
        const portfolio = await this.getCurrentPortfolio(stocks)
        const value = getCurrentTotalValue(portfolio)
        this.setState({
          portfolio,
          value
        })
      }
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
      this.setState({ message: '' })
      const { data } = await axios.post('/api/transactions', purchaseInfo)
      let message
      if (data === 'Unknown symbol') message = data
      else if (data.error) message = data.error
      if (message) this.setState({ message })
      else {
        await this.fetchPortfolio()
        this.setState({ message: 'Purchased!', user: data.user })
        return 'Success'
      }
    } catch (error) {
      console.log('caught', error)
    }
  }

  render() {
    const { value, portfolio, user, message } = this.state
    const cash = ((user.cash) / 100).toFixed(2)

    return (
      <div className='container my-5 pt-5'>

        <h1 className='mb-3'>Portfolio (${value.toFixed(2)})</h1>
        <div className='row'>

          <div className='col-sm-8 mx-auto'>
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
                    <Stock stock={stock} key={stock.ticker} />
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className='col-sm-4'>
            <h2>Cash - ${cash}</h2>
            <TransactionForm buyShares={this.buyShares} />
            {message && <h4> {message} </h4>}
          </div>

        </div>
      </div>
    )
  }
}