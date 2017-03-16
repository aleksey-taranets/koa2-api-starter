import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLSchema,
  GraphQLNonNull,
} from 'graphql';
import convert from 'koa-convert';
import graphqlHTTP from 'koa-graphql';
import userService from '../../services/userService';

const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

const UserInput = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const UserQuery = new GraphQLObjectType({
  name: 'UserQuery',
  fields: () => ({
    user: {
      type: new GraphQLList(User),
      description: 'Request User',
      args: {
        id: { type: GraphQLID },
        email: { type: GraphQLString },
      },
      resolve: async (parent, args = {}) => userService.find(args),
    },
  }),
});

const UserMutation = new GraphQLObjectType({
  name: 'UserMutation',
  fields: () => ({
    createUser: {
      type: User,
      description: 'Create User',
      args: {
        user: { type: UserInput },
      },
      resolve: async (value, { user }) => userService.create(user),
    },
  }),
});

const Schema = new GraphQLSchema({
  query: UserQuery,
  mutation: UserMutation,
});

export default convert(
  graphqlHTTP({
    schema: Schema,
    graphiql: true,
    formatError: err => {
      throw err;
    },
  }),
);
