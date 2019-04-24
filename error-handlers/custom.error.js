module.exports = class CustomError extends Error {
  constructor(status, message) {
    super()
    this.status = status || 500
    this.message = message || 'Something went wrong. Please try again.'
  }
}