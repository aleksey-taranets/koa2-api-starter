import Router from 'koa-router';
import Koa from 'koa';
import convert from 'koa-convert';
import {
  buildSchema
} from 'graphql';
import graphqlHTTP from 'koa-graphql';

// graphql example
const graphqlSchema = buildSchema(
  `
  type Query {
    quoteOfTheDay(i: Float): String
    random: Float!
    rollThreeDice: [Int]
  }
`,
);
const root = {
  quoteOfTheDay: ({
    i
  }) => i < 0.5 ? 'Take it easy' : 'Salvation lies within',
  random: () => Math.random() * 13,
  rollThreeDice: () => [1, 2, 3].map(() => 1 + Math.floor(Math.random() * 6)),
};

const moduleApi = new Koa();
const router = new Router();

router.all(
  '/',
  convert(
    graphqlHTTP({
      schema: graphqlSchema,
      rootValue: root,
      graphiql: true,
    }),
  ),
);

moduleApi.use(router.routes()).use(router.allowedMethods());

export default moduleApi;