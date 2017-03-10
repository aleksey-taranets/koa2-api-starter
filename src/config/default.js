import packageJson from '../../package.json';

module.exports = {
  api: {
    name: packageJson.name,
    version: 'v1',
    port: process.env.PORT || 3000,
  },
  db: {
    connections: {
      mongodb: {
        adapter: 'mongodb',
        host: 'localhost',
        user: '',
        database: 'koa2-api-starter',
      },
    },
  },
  isDevelopment: process.env.NODE_ENV !== 'production',
};
