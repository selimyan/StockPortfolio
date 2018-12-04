const router = require('express').Router()
const { User, Transaction } = require('../db/models')
const axios = require('axios')

router.post('/', async (req, res, next) => {
  try {
    const { ticker, quantity } = req.body
    const currentPriceInfo = await axios.get(`https://api.iextrading.com/1.0/stock/${ticker}/price`)
    const price = currentPriceInfo.data
    const toBePaid = price * quantity
    const { cash, id } = await User.findById(req.user.id)
    if (cash < toBePaid) { res.send({ error: 'You balance is lower than your current purchase' }) }
    else {
      const transaction = await Transaction.create({
        ticker,
        quantity,
        price,
        userId: id
      })
      const [, [updatedUser]] = await User.update({
        cash: cash - (price * quantity)
      },
        {
          returning: true,
          where: { id }
        }
      )
      res.json({ transaction, updatedUser })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router