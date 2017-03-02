const mount = require('koa-mount');
const HelloWorlds = require('./hello-world');

const initModules = (api) => {
  api.use(mount('/hello-world', HelloWorlds));
  return api;
};

module.exports = initModules;
