const router = require('express').Router()

router.get('/', async (req, res, next) => {
  try {
    const stocks = await req.user.getStocks()
    res.json(stocks)
  } catch (error) {
    next(error)
  }
})

module.exports = router