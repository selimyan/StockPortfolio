const router = require('express').Router()
const { User, Transaction } = require('../db/models')
const { getStocks } = require('./utils')

router.get('/', async (req, res, next) => {
  try {
    const transactions = await req.user.getTransactions()
    const portfolio = getStocks(transactions)
    res.json(portfolio)
  } catch (error) {
    next(error)
  }
})

module.exports = router