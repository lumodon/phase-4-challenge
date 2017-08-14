const path = require('path')
require('dotenv').config({
  path: path.join(__dirname, 'config/.env'),
})
const express = require('express')
const bodyParser = require('body-parser')
require('ejs')

const port = process.env.PORT || 3000

const app = express()

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
