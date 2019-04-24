const CustomError = require('./custom.error')

module.exports = class BadRequestError extends CustomError {
  constructor(message) {
    super(400, message || 'Bad Request')
  }
}
