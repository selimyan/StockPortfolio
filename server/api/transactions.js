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
    //check for errors
    if (!Number.isInteger(quantity) || quantity < 1) {
      res.json({ error: 'Invalid quantity' })
    } else {
      //get current price of the stock
      const { data } = await axios.get(`https://api.iextrading.com/1.0/stock/${ticker}/price`)
      const price = data * 100
      console.log('PRICE', price)

      //ensure there are enough funds for the transaction
      const toBePaid = price * quantity
      const { cash, id } = await User.findById(req.user.id)
      console.log('CAsh', cash)
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
          cash: cash - toBePaid
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