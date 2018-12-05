const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(`postgres://localhost:5432/${databaseName}`, {
  logging: false,
  timezone: '-05:00'
})

module.exports = db

//close db after tests
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close());
}