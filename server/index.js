const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()
const db = require('./db')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sessionStore = new SequelizeStore({ db })

//quit Mocha after tests
if (process.env.NODE_ENV === 'test') {
  after('close the session store', () => sessionStore.stopExpiringSessions());
}

//register passport
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

//logging middleware
app.use(morgan('dev'))

//body parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//session middleware with passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'The sea is calm',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  })
)

app.use(passport.initialize())
app.use(passport.session())

//routes
app.use('/api', require('./api'))

//static
app.use(express.static(path.join(__dirname, '..', 'public')))

//sync db
db.sync()

app.listen(8080, () => console.log('Sailing from port 8080!'))

//404
app.use((req, res, next) => {
  path.extname(req.path).length
    ? res.status(404).send('Not found')
    : next()
})

//send index.html
app.use('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

//handle errors from routes
app.use((err, req, res, next) => {
  if (err.response && err.response.data) {
    console.error(err.stack)
    res.send(err.response.data)
  } else {
    console.error(err)
    res.send('Internal server error')
  }
})

module.exports = app