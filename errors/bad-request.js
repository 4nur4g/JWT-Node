const CustomAPIError = require('../errors/custom-error');
const { StatusCodes } = require('http-status-codes');

class BadRequest extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BadRequest;
  }
}

module.exports = BadRequest;
