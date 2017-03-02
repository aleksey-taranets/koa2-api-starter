const Koa = require('koa');
const config = require('config');
const koaQs = require('koa-qs');
const body = require('koa-better-body');
const log = require('./utils/log');
const initModules = require('./modules');
const api = new Koa();

koaQs(api);
api
  .use(body());

// middlewares
const notFound = require('./middlewares/notFound');

initModules(api);
api
    .use(notFound);

// Start API
api.listen(config.get('Api.port'));
log.info(`Application is runing on port - ${config.get('Api.port')}`);
