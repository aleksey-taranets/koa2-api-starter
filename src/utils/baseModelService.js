import DB from '../db';
import { ModelError } from './errors';

export default class BaseModelService {
  constructor(name) {
    this.db = DB;
    this.init(name);
  }

  async init(name) {
    try {
      this.collection = await this.db.model(name);
    } catch (err) {
      throw new ModelError(this.db.model);
    }
    return this;
  }

  async find(query = {}) {
    return this.collection.find(query);
  }

  async create(doc) {
    return this.collection.create(doc);
  }

  // eslint-disable-next-line class-methods-use-this
  prepareRespons(data) {
    if (!data) {
      return 'No data found';
    }
    return data;
  }
}
