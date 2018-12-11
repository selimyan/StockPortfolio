const User = require('./user')
const Transaction = require('./transaction')
const Share = require('./shares')

//associations
User.hasMany(Transaction)
User.hasMany(Share)

module.exports = {
  User,
  Transaction,
  Share
}