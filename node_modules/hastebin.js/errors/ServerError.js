const InternalError = require('./InternalError');

class ServerError extends InternalError {
  constructor(status, message) {
    super(status, message);
    console.log(status, message);
  }
}

module.exports = ServerError;