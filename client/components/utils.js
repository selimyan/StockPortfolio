export const stringifyTickers = (portfolio) => {
  let tickers = []
  for (let i = 0; i < portfolio.length; i++) {
    tickers.push(portfolio[i].ticker)
  }
  return tickers.join(',').toLowerCase()
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
  let portfolio = []
  for (let i = 0; i < stocks.length; i++) {
    let currentStock = stocks[i]
    let item = {
      ticker: currentStock.ticker,
      quantity: currentStock.quantity,
      price: data[currentStock.ticker].quote.latestPrice,
      open: data[currentStock.ticker].quote.open,
      value: data[currentStock.ticker].quote.latestPrice * currentStock.quantity
    }
    portfolio.push(item)
  }
  return portfolio
}

export const getStocks = (transactions) => {
  const stocks = {}
  transactions.forEach((transaction) => {
    let ticker = transaction.ticker.toUpperCase()
    if (stocks[ticker]) {
      stocks[ticker] += transaction.quantity
    } else {
      stocks[ticker] = transaction.quantity
    }
  })

  let portfolio = []
  for (const stock in stocks) {
    portfolio.push({
      ticker: stock,
      quantity: stocks[stock]
    })
  }

  return portfolio
}

export const getDate = (date) => {
  console.log('date', date)
  return `${date.slice(11, 19)} | ${date.slice(0, 10)}`
}