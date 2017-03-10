import config from '../config';

module.exports = async ctx => {
  ctx.status = 404;
  ctx.body = {
    app: config.Api.name,
    error: 'Not Found',
    version: config.Api.version,
  };
};
