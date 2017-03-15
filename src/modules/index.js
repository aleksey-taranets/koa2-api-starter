import mount from 'koa-mount';
import HelloWorlds from './hello-world';

const initModules = api => {
  api.use(mount('/hello-world', HelloWorlds));
  return api;
};

export default initModules;
