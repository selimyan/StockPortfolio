const User = require('./user')
const Portfolio = require('./portfolio')
const Transaction = require('./transaction')

//associations
Portfolio.belongsTo(User) //userid, getUser()
User.hasOne(Portfolio) //allows to include portfolio with user
User.hasMany(Transaction) //userid, get, set, add, create, remove
Portfolio.hasMany(Transaction)

module.exports = {
  User,
  Portfolio,
  Transaction
}