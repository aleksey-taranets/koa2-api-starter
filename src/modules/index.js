import mount from 'koa-mount';
import HelloWorlds from './hello-world';
import graphqlModule from './graphql';

const initModules = api => {
  api.use(mount('/hello-world', HelloWorlds));
  api.use(mount('/graphql', graphqlModule));
  api.use(async ctx => {
    this.body = ctx.response.body;
  });

  return api;
};

export default initModules;
