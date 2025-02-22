const { ERROR_CODES } = require("../constant/error.code");

class AppError extends Error {
  constructor({
    message = "An error occurred",
    statusCode = 500,
    errorCode,
    details = null,
  }) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor({
    message = "Validation failed",
    errorCode = ERROR_CODES.INVALID_INPUT,
    details = null,
  }) {
    super({ message, statusCode: 400, errorCode, details });
  }
}

class AuthenticationError extends AppError {
  constructor({
    message = "Authentication failed",
    errorCode = ERROR_CODES.INVALID_CREDENTIALS,
    details = null,
  }) {
    super({ message, statusCode: 401, errorCode, details });
  }
}

class NotFoundError extends AppError {
  constructor({
    message = "Resource not found",
    errorCode = ERROR_CODES.NOT_FOUND,
    details = null,
  }) {
    super({ message, statusCode: 404, errorCode, details });
  }
}

class NoContentError extends AppError {
  constructor({
    message = "Content not found",
    errorCode = ERROR_CODES.NOT_FOUND,
    details = null,
  }) {
    super({ message, statusCode: 204, errorCode, details });
  }
}

class ConflictError extends AppError {
  constructor({
    message = "Resource already exists",
    errorCode = ERROR_CODES.DUPLICATE_ENTRY,
    details = null,
  }) {
    super({ message, statusCode: 409, errorCode, details });
  }
}

class UnauthorizedError extends AppError {
  constructor({
    message = "Unauthorized",
    errorCode = ERROR_CODES.UNAUTHORIZED,
    details = null,
  }) {
    super({ message, statusCode: 401, errorCode, details });
  }
}
class ActionNotAllowedError extends AppError {
  constructor({
    message = "Action not allowed",
    errorCode = ERROR_CODES.ACTION_NOT_ALLOWED,
    details = null,
  }) {
    super({ message, statusCode: 403, errorCode, details });
  }
  
}
class PaymentFailedError extends AppError {
  constructor({
    message = "Payment failed",
    errorCode = ERROR_CODES.PAYMENT_FAILED,
    details = null,
  }) {
    super({ message, statusCode: 402, errorCode, details });
  }
}
module.exports = {
  AppError,
  ValidationError,
  AuthenticationError,
  NotFoundError,
  ConflictError,
  UnauthorizedError,
  NoContentError,
  ActionNotAllowedError,
  PaymentFailedError
};
