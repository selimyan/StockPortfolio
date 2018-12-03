const getStocks = (transactions) => {
  const stocks = {}
  transactions.forEach((transaction) => {
    let ticker = transaction.ticker
    if (stocks[ticker]) {
      stocks[ticker] += transaction.quantity
    } else {
      stocks[ticker] = transaction.quantity
    }
  })

  let portfolio = []
  for (const stock in stocks) {
    portfolio.push({
      ticker: stock.toUpperCase(),
      quantity: stocks[stock]
    })
  }

  return portfolio
}

module.exports = { getStocks }