export const stringifyTickers = (portfolio) => {
  let tickers = []
  for (let i = 0; i < portfolio.length; i++) {
    tickers.push(portfolio[i].ticker)
  }
  return tickers.join(',').toLowerCase()
}

