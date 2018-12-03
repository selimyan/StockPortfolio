const Sequelize = require('sequelize')
const db = require('../index')

const Portfolio = db.define('portfolio', {
  cash: {
    type: Sequelize.INTEGER,
    defaultValue: 500000,
    validate: {
      min: 0
    }
  }
})

module.exports = Portfolio