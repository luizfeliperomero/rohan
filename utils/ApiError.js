class ApiError extends Error {
  constructor(message, statusCode, details = null) {
    this.message = message;
    this.statusCode = statusCode;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
