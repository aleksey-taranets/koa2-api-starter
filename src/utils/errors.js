import log from './log';

export class AppError extends Error {
  constructor(message, extra) {
    super(message);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
    this.extra = extra;
  }
}

export class HttpError extends AppError {
  constructor(status, message, extra) {
    super(message, extra);
    this.name = this.constructor.name;
    this.status = status;
    log.error(this.stack);
  }
}

export class ServiceError extends AppError {
  constructor(message, extra) {
    super(message, extra);
    this.name = this.constructor.name;
    log.error(this.stack);
  }
}

export class ModelError extends AppError {
  constructor(message, extra) {
    super(message, extra);
    this.name = this.constructor.name;
    log.error(message, this.stack);
  }
}

export default {
  AppError,
  HttpError,
  ServiceError,
  ModelError,
};
