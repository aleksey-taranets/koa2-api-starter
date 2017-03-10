import baseModelService from '../../utils/baseModelService';

class UserService extends baseModelService {
  async findOne(query) {
    const result = await this.collection.findOne(query);
    return this.prepareRespons(result);
  }
}

export default new UserService('user');
