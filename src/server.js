const path = require('path')
require('dotenv').config({
  path: path.join(__dirname, 'config/.env'),
})
const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
require('ejs')

const port = process.env.PORT || 3000
const app = express()

app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_SECRET_1, process.env.SESSION_SECRET_2],
  maxAge: (24 * 60 * 60 * 1000) // 1 day === 24 hours
}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views/pages'))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', require('./server/routes'))

app.use((req, res) => {
  res.status(404).render('not_found')
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`) // eslint-disable-line no-console
})
