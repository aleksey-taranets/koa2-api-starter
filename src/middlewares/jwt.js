import jwtMiddleware from 'koa-jwt';
import config from '../config';

export default jwtMiddleware({
  secret: config.jwt.secret,
  passthrough: true,
  key: config.jwt.key,
});
