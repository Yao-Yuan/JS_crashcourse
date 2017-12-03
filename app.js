const express = require("express")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

require('./database-connection')

const  app = express();

app.use(bodyParser.json())
app.use(cookieParser())
app.engine('pug', require('pug').__express)
app.set('view engine', 'pug')

const location = require('./routes/location')
const direction = require('./routes/direction')
  
app.use('/location', location);
app.use('/direction', direction);
  
app.get('/', async (req, res, next) => {
     res.render('index')
  })

module.exports = app
