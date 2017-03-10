import packageJson from '../../package.json';

module.exports = {
  Api: {
    name: packageJson.name,
    version: 'v1',
    port: process.env.PORT || 3000,
  },
};
