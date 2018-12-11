const Sequelize = require('sequelize')
const db = require('../index')

const Stock = db.define('stock', {
  ticker: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      min: 1
    }
  }
})

module.exports = Stock