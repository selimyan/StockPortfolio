const router = require('express').Router()
const { User, Transaction } = require('../db/models')
const { getStocks } = require('./utils')
const axios = require('axios')

router.get('/', async (req, res, next) => {
  try {
    const transactions = await req.user.getTransactions()
    const portfolio = getStocks(transactions)
    res.json(portfolio)
  } catch (error) {
    next(error)
  }
})

router.get('/try', async (req, res, next) => {
  try {
    const price = await axios.get('https://api.iextrading.com/1.0/stock/aapl/price')
    console.log('--------', price.data)
    res.json(price.data)
  } catch (error) {
    next(error)
  }
})

module.exports = router