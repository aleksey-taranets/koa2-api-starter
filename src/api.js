import Koa from 'koa';
import koaQs from 'koa-qs';
import body from 'koa-better-body';
import helmet from 'koa-helmet';
import logger from 'koa-logger';

import config from './config';
import log from './utils/log';
import initModules from './modules';
import notFound from './middlewares/notFound';
import errorHandler from './middlewares/errorHandler';
import db from './db';

db
  .connect()
  .then(() => {
    const api = new Koa();

    // external middlewares
    koaQs(api);
    api.use(helmet());
    api.use(body());

    if (config.isDevelopment) {
      api.use(logger());
    }

    // middlewares
    api.use(errorHandler);
    initModules(api);
    api.use(notFound);

    // Start API
    api.listen(config.api.port);
    log.info(`Application is runing on port - ${config.api.port}`);
  })
  .catch(err => log.error(err.message));
