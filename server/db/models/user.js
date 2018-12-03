const Sequelize = require('sequelize')
const db = require('../index')
const crypto = require('crypto')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt')
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cash: {
    type: Sequelize.INTEGER,
    defaultValue: 500000,
    validate: {
      min: 0
    }
  }
})

//instance methods
User.prototype.correctPassword = function (password) {
  return User.encryptPassword(password, this.salt()) === this.password()
}

// User.prototype.getStocks = function () {
//   const transactions = this.getTransactions()
//   console.log('TRANSACTIONS', transactions)
// }

//class methods
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (text, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(text)
    .update(salt)
    .digest('hex')
}

//hooks
const setSaltAndPassword = (user) => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)

module.exports = User