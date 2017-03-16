import mount from 'koa-mount';
import HelloWorlds from './hello-world';
import UserModule from './user';

const initModules = api => {
  api.use(mount('/hello-world', HelloWorlds));
  api.use(mount('/user', UserModule));

  return api;
};

export default initModules;
