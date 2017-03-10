import Koa from 'koa';
import koaQs from 'koa-qs';
import body from 'koa-better-body';
import helmet from 'koa-helmet';

import config from './config';
import log from './utils/log';
import initModules from './modules';
import notFound from './middlewares/notFound';

const api = new Koa();

koaQs(api);
api.use(helmet()).use(body());

// middlewares
initModules(api);
api.use(notFound);

// Start API
api.listen(config.Api.port);
log.info(`Application is runing on port - ${config.Api.port}`);

export default api;
