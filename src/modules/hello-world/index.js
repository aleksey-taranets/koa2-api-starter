import Router from 'koa-router';
import Koa from 'koa';
import userService from './userService';

const api = new Koa();
const router = new Router();

router.get('/', ctx => {
  ctx.body = 'Hello World';
});

router.get('/db', async ctx => {
  ctx.body = await userService.findOne({ email: 'as@as.as' });
});

api.use(router.routes()).use(router.allowedMethods());

module.exports = api;
