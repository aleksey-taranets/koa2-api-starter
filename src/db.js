import mongodbAdapter from 'sails-mongo';
import Waterline from 'waterline';
import recursiveReadSync from 'recursive-readdir-sync';
import path from 'path';
import config from './config';
import log from './utils/log';

class DB {
  constructor() {
    this.dbConfig = {
      adapters: {
        mongodb: mongodbAdapter,
      },
      connections: config.db.connections,
    };
    this.waterlineOrm = new Waterline();
    this.modelsDir = path.join(__dirname, '/models');

    recursiveReadSync(this.modelsDir)
      .filter(file => file.indexOf('.model.js') !== -1 && file.indexOf('.map') === -1)
      .forEach(file => {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const model = require(file).default;
        this.waterlineOrm.loadCollection(model);
      });

    this.connection = new Promise((resolve, reject) => {
      this.waterlineOrm.initialize(this.dbConfig, (err, models) => {
        if (err) reject(err.message);
        log.info('DB connected');
        resolve(models.collections);
      });
    });
  }

  connect() {
    return this.connection;
  }

  async model(name) {
    try {
      const models = await this.connection;
      const model = await models[name];
      return model;
    } catch (err) {
      log.error(err.message);
      return null;
    }
  }
}

export default new DB();
