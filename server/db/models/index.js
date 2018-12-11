const User = require('./user')
const Transaction = require('./transaction')
const Stock = require('./stock')

//associations
User.hasMany(Transaction)
User.hasMany(Stock)

module.exports = {
  User,
  Transaction,
  Stock
}