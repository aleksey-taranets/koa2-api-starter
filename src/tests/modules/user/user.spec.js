import { describe } from 'ava-spec';
import request from 'supertest';
import jwt from 'jsonwebtoken';

import moduleApi from '../../../modules/user';
import DB from '../../../db';
import config from '../../../config';

const apiServer = request(moduleApi.listen());

const testUserData = {
  name: 'test',
  say: 'Hi!',
  role: 'guest',
};
const token = jwt.sign(testUserData, config.jwt.secret, { noTimestamp: true });

describe('User module tests', it => {
  it.before(() => DB.connect());

  it('test /get-test-token', async t => {
    const res = await apiServer.get('/get-test-token');
    t.is(res.status, 200);
    t.is(res.text, token);
  });

  it('test /check-test-token', async t => {
    const res = await apiServer.post('/check-test-token').set('Authorization', `Bearer ${token}`);
    t.is(res.status, 200);
    t.is(res.body.name, testUserData.name);
    t.is(res.body.role, testUserData.role);
  });

  it('test /only-authorized', async t => {
    const res = await apiServer.get('/only-authorized');
    t.is(res.status, 401);
  });

  it('test /only-for-admin', async t => {
    const res = await apiServer.get('/only-for-admin').set('Authorization', `Bearer ${token}`);
    t.truthy(res.body.error);
    t.is(res.status, 401);
  });

  it('test 404', async t => {
    const res = await apiServer.get('/some-url');
    t.is(res.status, 404);
  });
});
