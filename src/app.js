const express = require('express')
const apiRoute = require('./routes');
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
require('./DB/mongo')

const app = express()

app.use(cors());
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



// middleware application routes

app.use((req, res, next) => {
  // console.log('Log system:', process.env)
  next()
})

app.get('/', function (req, res) {
    res.send('Api is running')
  })
app.use('/api', apiRoute);

app.get('/api*', function (req, res) {
    return res.json({'message': 'api not found'})
  })


app.listen(3000);