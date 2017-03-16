import Router from 'koa-router';
import Koa from 'koa';
import UserGraphQLHTTP from '../../models/user/user.graphql';

const moduleApi = new Koa();
const router = new Router();

router.all('/', UserGraphQLHTTP);

moduleApi.use(router.routes()).use(router.allowedMethods());

export default moduleApi;
