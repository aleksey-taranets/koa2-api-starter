import Router from 'koa-router';
import Koa from 'koa';
import jwt from 'jsonwebtoken';

import UserGraphQLHTTP from '../../models/user/user.graphql';
import config from '../../config';
import jwtMiddleware from '../../middlewares/jwt';
import errorHandler from '../../middlewares/errorHandler';
import acl from './acl';

const moduleApi = new Koa();
const router = new Router();

router.all('/', UserGraphQLHTTP);

router.get('/get-test-token', ctx => {
  ctx.body = jwt.sign(
    {
      name: 'test',
      say: 'Hi!',
      role: 'guest',
    },
    config.jwt.secret,
    {
      noTimestamp: config.isDevelopment,
    },
  );
});

router.post('/check-test-token', ctx => {
  ctx.body = ctx.state[config.jwt.key];
});

router.get('/only-authorized', acl.onlyAuthorized, ctx => {
  ctx.body = ctx.state[config.jwt.key];
});

router.get('/only-for-admin', acl.onlyAdmin, ctx => {
  ctx.body = ctx.state[config.jwt.key];
});

moduleApi.use(errorHandler).use(jwtMiddleware).use(router.routes()).use(router.allowedMethods());

export default moduleApi;
