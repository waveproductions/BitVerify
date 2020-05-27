const InternalError = require('./InternalError');

class ClientError extends InternalError {
  constructor(status, message) {
    super(status, message);
    console.log(status, message);
  }
}

module.exports = ClientError;