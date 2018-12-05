const router = require('express').Router()
const axios = require('axios')
const { User, Transaction } = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const transactions = await req.user.getTransactions()
    res.json(transactions)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  const { ticker, quantity } = req.body
  try {
    //get current price of the stock
    const { data } = await axios.get(`https://api.iextrading.com/1.0/stock/${ticker}/price`)
    //check for errors
    if (!Number.isInteger(quantity) || quantity < 1) {
      res.json({ error: 'Invalid quantity' })
    } else {
      const price = data
      const toBePaid = price * quantity
      const { cash, id } = await User.findById(req.user.id)
      if (cash < toBePaid) {
        res.send({ error: 'You balance is lower than your current purchase' })

        //create transaction and update user
      } else {
        await Transaction.create({
          ticker,
          quantity,
          price,
          userId: id
        })
        const [, [updatedUser]] = await User.update({
          cash: cash - (price * quantity)
        },
          { returning: true, where: { id } }
        )
        res.json({ user: updatedUser })
      }
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router