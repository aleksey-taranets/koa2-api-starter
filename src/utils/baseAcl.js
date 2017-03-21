import { HttpError } from '../utils/errors';
import config from '../config';

class BaseAcl {
  constructor() {
    this.onlyAuthorized = this.onlyAuthorized.bind(this);
    this.onlyAdmin = this.onlyAdmin.bind(this);
  }
  // eslint-disable-next-line class-methods-use-this
  throwHttpError() {
    throw new HttpError(401, 'Access Denied');
  }

  onlyAuthorized(ctx, next) {
    if (!ctx.state[config.jwt.key] || !ctx.state[config.jwt.key].iat) {
      this.throwHttpError();
    }
    return next();
  }

  onlyAdmin(ctx, next) {
    if (ctx.state[config.jwt.key].role !== 'admin') {
      this.throwHttpError();
    }
    return next();
  }
}

export default BaseAcl;
