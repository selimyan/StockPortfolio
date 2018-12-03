import React, { Component } from 'react'
import axios from 'axios'

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
    const { user } = this.props
    const { data } = await axios.get('/api/portfolio')
    this.setState({
      user,
      portfolio: data
    })
  }

  render() {
    const { value, portfolio, user } = this.state
    console.log('-----', portfolio)
    return (
      <div>
        <div>
          <h1>Portfolio (${(value / 100).toFixed(2)})</h1>
          <div>
            {portfolio.map((stock) => {
              return (
                <div key={stock.ticker}>
                  <div>{stock.ticker} - {stock.quantity} Shares</div>
                  <div>${stock.price}</div>
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