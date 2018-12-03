const User = require('./user')
const Portfolio = require('./portfolio')

//associations
Portfolio.belongsTo(User)

module.exports = {
  User,
  Portfolio
}