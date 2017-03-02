const Router = require('koa-router');
const Koa = require('koa');

const api = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  ctx.body = 'Hello World';
});

router.get('/nested', (ctx) => {
  ctx.body = 'Hello World Nested';
});

api
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = api;
