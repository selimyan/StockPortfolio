import React, { Component } from 'react'
import { SSL_OP_NO_TICKET } from 'constants';

export default class Portfolio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: { id: 1 },
      value: 594334,
      portfolio: [
        { ticker: 'aapl', qty: 6, price: 0 },
        { ticker: 'stwd', qty: 40, price: 0 },
        { ticker: 'nflx', qty: 86, price: 0 },
        { ticker: 'msft', qty: 10, price: 0 },
        { ticker: 'att', qty: 5, price: 0 },
      ],
      cash: 500000,
    }
  }

  render() {
    const { value, portfolio, cash } = this.state
    return (
      <div>
        <div>
          <h1>Portfolio (${(value / 100).toFixed(2)})</h1>
          <div>
            {portfolio.map((stock) => {
              return (
                <div key={stock.ticker}>
                  <div>{stock.ticker} - {stock.qty} Shares</div>
                  <div>${stock.price}</div>
                </div>
              )
            })}
          </div>
        </div>
        <div>
          <h2>Cash - ${(cash / 100).toFixed(2)}</h2>
        </div>
      </div>
    )
  }
}