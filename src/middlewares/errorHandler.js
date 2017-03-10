import { HttpError } from '../utils/errors';
import config from '../config';

export default async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (config.isDevelopment) {
      ctx.body = { error: err.message, stack: err.stack.split('\n') };
    } else {
      ctx.body = { error: 'Uncatched error' };
    }

    if (err instanceof HttpError) {
      ctx.status = err.status;
      if (err.status === 401) {
        ctx.body = { error: 'Protected resource, use Authorization header to get access' };
      }
    } else {
      ctx.status = 400;
    }
  }
};
