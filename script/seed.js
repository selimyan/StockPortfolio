const db = require('../server/db')
const { User, Transaction } = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('---db synced---')

  const users = await Promise.all([
    User.create({ email: 'gaya@gmail.com', password: 'ppp', name: 'Gaya' }),
    User.create({ email: 'dave@gmail.com', password: 'ppp', name: 'Dave' }),
    User.create({ email: 'ofo@gmail.com', password: 'ppp', name: 'Ofo' })
  ])

  const transactions = await Promise.all([
    Transaction.create({ ticker: 'aapl', quantity: 4, price: 17618, userId: 1 }),
    Transaction.create({ ticker: 'stwd', quantity: 40, price: 2256, userId: 1 }),
    Transaction.create({ ticker: 'aapl', quantity: 2, price: 17618, userId: 1 }),
    Transaction.create({ ticker: 'nflx', quantity: 86, price: 27509, userId: 2 }),
    Transaction.create({ ticker: 'msft', quantity: 10, price: 10900, userId: 2 }),
    Transaction.create({ ticker: 'att', quantity: 2, price: 3073, userId: 3 }),
  ])

  console.log(`---seeded successfully ${users.length} users, ${transactions.length} transactions---`)

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