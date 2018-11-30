const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()

//logging middleware
app.use(morgan('dev'))

//body parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//static
app.use(express.static(path.join(__dirname, '..', 'public')))

//routes go here

//sync db

app.listen(8080, () => console.log('Sailing from port 8080!'))

//404
app.use((req, res, next) => {
  path.extname(req.path.length > 0
    ? res.status(404).send('Not found')
    : next()
  )
})

//send index.html
app.use('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

//handle errors
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

module.exports = app