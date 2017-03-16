import baseModelService from '../utils/baseModelService';

class UserService extends baseModelService {
  async findOne(query) {
    return this.collection.findOne(query);
  }
}

export default new UserService('user');
