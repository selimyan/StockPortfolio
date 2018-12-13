const router = require('express').Router()
const { Stock } = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const stocks = await req.user.getStocks()
    res.json(stocks)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  let { ticker, quantity } = req.body
  ticker = ticker.toUpperCase()
  try {
    const stocks = await req.user.stocksOwned()
    if (stocks[ticker]) {
      let updatedQuantity = stocks[ticker] + quantity
      await Stock.update({ quantity: updatedQuantity }, { where: { ticker } })
    } else {
      await Stock.create({ ticker, quantity, userId: req.user.id })
    }
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

module.exports = router