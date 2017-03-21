import packageJson from '../../package.json';

module.exports = {
  api: {
    name: packageJson.name,
    version: packageJson.version,
    port: process.env.PORT || 3000,
  },
  jwt: {
    secret: 'simple api secret',
    key: process.env.JWT_KEY || 'jwtdata',
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
