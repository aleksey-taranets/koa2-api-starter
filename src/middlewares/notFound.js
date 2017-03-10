import config from '../config';

module.exports = async ctx => {
  ctx.status = 404;
  ctx.body = {
    app: config.api.name,
    error: 'Not Found',
    version: config.api.version,
  };
};
