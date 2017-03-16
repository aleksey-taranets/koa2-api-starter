import { describe } from 'ava-spec';
import request from 'supertest';
import moduleApi from '../../../modules/hello-world';
import DB from '../../../db';

const apiServer = request(moduleApi.listen());

describe('module#1', it => {
  it.before(() => DB.connect());

  it('test /hello-world', async t => {
    const res = await apiServer.get('/');
    t.is(res.status, 200);
  });

  it('test /hello-world/1', async t => {
    const res = await apiServer.get('/1');
    t.is(res.status, 404);
  });

  it('test /hello-world/db', async t => {
    const res = await apiServer.get('/db');
    t.truthy(res.body.email);
    t.is(res.status, 200);
  });
});
