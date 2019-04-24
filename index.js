const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const routes = require('./routes')

const app = express()
const router = express.Router()

const connectToDatabase = require('./helpers/db_connect')
connectToDatabase()

routes(router)

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())

app.use('/', router)

app.use('*', (err, req, res, next) => {
  err.status = err.status || 500
  res.status(err.status)

  const message = err.message || 'Internal Server Error'
  res.send({
    status: err.status,
    message: message
  })
})

app.listen(PORT, () => console.log(`'Contacts Book' server is listening on port: ${PORT}`))
