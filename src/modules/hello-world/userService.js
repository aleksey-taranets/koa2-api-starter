import baseModelService from '../../utils/baseModelService';

class UserService extends baseModelService {
  async findOne(query) {
    const userCollection = await this.collection;
    const result = await userCollection.findOne(query);
    return this.prepareRespons(result);
  }
}

export default new UserService('user');
