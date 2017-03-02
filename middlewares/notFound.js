const config = require('config');

module.exports = async (ctx) => {
  ctx.status = 404;
  ctx.body = {
    app: config.get('Api.name'),
    error: 'Not Found',
    version: config.get('Api.version'),
  };
};
