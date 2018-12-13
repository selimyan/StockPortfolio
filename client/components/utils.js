export const stringifyTickers = (portfolio) => {
  let tickers = []
  for (let i = 0; i < portfolio.length; i++) {
    tickers.push(portfolio[i].ticker)
  }
  return tickers.join(',')
}

export const getCurrentTotalValue = (portfolio) => {
  let total = 0
  for (let i = 0; i < portfolio.length; i++) {
    let stock = portfolio[i]
    total += stock.value
  }
  return total
}

export const createPortfolio = (stocks, data) => {
  return stocks.map(stock => {
    const { ticker, quantity } = stock
    const { latestPrice, open } = data[ticker].quote
    return {
      ticker,
      quantity,
      price: latestPrice,
      open,
      value: latestPrice * quantity
    }
  })
}

export const getDate = (date) => {
  return `${date.slice(11, 19)} | ${date.slice(0, 10)}`
}