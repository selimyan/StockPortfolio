const db = require('../server/db')
const { User, Transaction, Stock } = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('---db synced---')

  const users = await Promise.all([
    User.create({ email: 'gaya@gmail.com', password: 'ppp', name: 'Gaya', cash: 304052 }),
    User.create({ email: 'dave@gmail.com', password: 'ppp', name: 'Dave', cash: 170928 }),
    User.create({ email: 'ofo@gmail.com', password: 'ppp', name: 'Ofo', cash: 493854 })
  ])

  const transactions = await Promise.all([
    Transaction.create({ ticker: 'AAPL', quantity: 4, price: 17618, userId: 1 }),
    Transaction.create({ ticker: 'STWD', quantity: 40, price: 2256, userId: 1 }),
    Transaction.create({ ticker: 'AAPL', quantity: 2, price: 17618, userId: 1 }),
    Transaction.create({ ticker: 'NFLX', quantity: 8, price: 27509, userId: 2 }),
    Transaction.create({ ticker: 'MSFT', quantity: 10, price: 10900, userId: 2 }),
    Transaction.create({ ticker: 'T', quantity: 2, price: 3073, userId: 3 }),
  ])

  const stocks = await Promise.all([
    Stock.create({ ticker: 'AAPL', quantity: 6, userId: 1 }),
    Stock.create({ ticker: 'STWD', quantity: 40, userId: 1 }),
    Stock.create({ ticker: 'NFLX', quantity: 8, userId: 2 }),
    Stock.create({ ticker: 'MSFT', quantity: 10, userId: 2 }),
    Stock.create({ ticker: 'T', quantity: 2, userId: 3 })
  ])

  console.log(`---seeded successfully ${users.length} users, ${transactions.length} transactions, ${stocks.length} shares---`)

}

async function runSeed() {
  try {
    await seed()
  } catch (err) {
    console.error(err)
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed