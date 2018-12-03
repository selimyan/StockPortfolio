const Sequelize = require('sequelize')
const db = require('../index')

const Transaction = db.define('transaction', {
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
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      min: 1
    }
  }
})

module.exports = Transaction