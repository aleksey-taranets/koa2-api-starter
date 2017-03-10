import mongodbAdapter from 'sails-mongo';
import Waterline from 'waterline';
import fs from 'fs';
import path from 'path';
import config from './config';
import log from './utils/log';

class DB {
  constructor() {
    log.debug('constructor DB');

    this.dbConfig = {
      adapters: {
        mongodb: mongodbAdapter,
      },
      connections: config.db.connections,
    };
    this.waterlineOrm = new Waterline();
    this.modelsDir = path.join(__dirname, '/models');

    fs
      .readdirSync(this.modelsDir)
      .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
      .forEach(file => {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const model = require(path.join(this.modelsDir, file)).default;
        this.waterlineOrm.loadCollection(model);
      });

    this.connection = new Promise((resolve, reject) => {
      this.waterlineOrm.initialize(this.dbConfig, (err, models) => {
        if (err) {
          reject(err.message);
        }
        resolve(models.collections, models.connections);
        return this;
      });
    });
  }

  async model(name) {
    const models = await this.connection;
    return models[name];
  }
}

export default new DB();
