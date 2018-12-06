const User = require('./user')
const Transaction = require('./transaction')

//associations
User.hasMany(Transaction)

module.exports = {
  User,
  Transaction
}