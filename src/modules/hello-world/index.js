import Router from 'koa-router';
import Koa from 'koa';
import userService from './userService';

const moduleApi = new Koa();
const router = new Router();

router.get('/', ctx => {
  ctx.body = 'Hello World';
});

router.get('/db', async ctx => {
  ctx.body = await userService.findOne({ email: 'as@as.as' });
});

moduleApi.use(router.routes()).use(router.allowedMethods());

export default moduleApi;
