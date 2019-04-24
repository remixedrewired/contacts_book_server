const CustomError = require('./custom.error')

module.exports = class ConflictError extends CustomError {
  constructor(message) {
    super(409, message || 'Conflict')
  }
}