const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoStore = require('connect-mongo')(session)
const logger = require('morgan')
const port = process.env.PORT || 3000
const app = express()
const multipart = require('connect-multiparty')
const env = process.env.NODE_ENV || 'development'

// 开发环境下效果配置 生成环境要改
if ('development' === env) {
  dbUrl = 'mongodb://localhost/bigtree'
  app.set('showStackError', true)
  app.use(logger(':method :url :status'))
  app.locals.pretty = true
  mongoose.set('debug', true)
}

mongoose.Promise = global.Promise
mongoose.connect(dbUrl, {useMongoClient: true})

app.set('views', './app/views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(multipart())
app.use(session({
    secret: 'bigtree',
    store: new mongoStore({
      url: dbUrl,
      collection: 'sessions'
    })
}))

require('./config/routes')(app)

app.locals.moment = require('moment')
app.use(express.static(path.join(__dirname, 'public')))
app.listen(port)
