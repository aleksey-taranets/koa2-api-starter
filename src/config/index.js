import config from './default';
import configTest from './test';

let envConfig = {};
switch (process.env.NODE_ENV) {
  case 'test':
    envConfig = configTest;
    break;
  default:
    break;
}

export default Object.assign({}, config, envConfig);
