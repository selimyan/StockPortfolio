const User = require('./user')
const Transaction = require('./transaction')

//associations
User.hasMany(Transaction) //userid, get, set, add, create, remove

module.exports = {
  User,
  Transaction
}