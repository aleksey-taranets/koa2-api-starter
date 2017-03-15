import Koa from 'koa';
import koaQs from 'koa-qs';
import body from 'koa-better-body';
import helmet from 'koa-helmet';

import config from './config';
import log from './utils/log';
import initModules from './modules';
import notFound from './middlewares/notFound';
import errorHandler from './middlewares/errorHandler';
import db from './db';

db.connection
  .then(() => {
    const api = new Koa();

    process.on('uncaughtException', err => log.error(err.message, err.stack));
    process.on('uncaughtRejection', err => log.error(err.message, err.stack));

    koaQs(api);
    api.use(errorHandler);
    api.use(helmet());
    api.use(body());

    // middlewares
    initModules(api);
    api.use(notFound);

    // Start API
    api.listen(config.api.port);
    log.info(`Application is runing on port - ${config.api.port}`);
  })
  .catch(log.error);
