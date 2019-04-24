const mongoose = require('mongoose')
const chalk = require('chalk')

const connected = chalk.bold.cyan
const disconnected = chalk.bold.yellow
const error = chalk.bold.red
const termination = chalk.bold.magenta

module.exports = () => {
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true, })

  mongoose.connection.on('connected', () => {
    console.log(connected('Mongoose connection is open'))
  })

  mongoose.connection.on('error', (e) => {
    console.log(error(`Mongoose connection has occurred error: ${e}`))
  })

  mongoose.connection.on('disconnected', () => {
    console.log(disconnected('Mongoose connection is disconnected'))
  })

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(termination('Mongoose connection is disconnected due to application termination'))
      process.exit(0)
    })
  })
}