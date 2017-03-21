import Router from 'koa-router';
import Koa from 'koa';
import jwt from 'jsonwebtoken';

import UserGraphQLHTTP from '../../models/user/user.graphql';
import config from '../../config';

const moduleApi = new Koa();
const router = new Router();

router.all('/', UserGraphQLHTTP);

router.get('/get-test-token', ctx => {
  ctx.body = jwt.sign(
    {
      name: 'test',
      say: 'Hi!',
      role: 'admin',
    },
    config.api.jwtSecret,
  );
});

router.post('/check-test-token', ctx => {
  ctx.body = ctx.state.jwtdata;
});

// todo: add koa-roles
router.get('/only-for-admin', ctx => {
  ctx.body = ctx.state.jwtdata;
});

moduleApi.use(router.routes()).use(router.allowedMethods());

export default moduleApi;
