import test from 'ava';
import request from 'supertest';
import api from './index';

const apiServer = request(api.listen());

test('test /hello-world', async t => {
  const res = await apiServer.get('/');
  t.is(res.status, 200);
});

test('bar', async t => {
  const bar = Promise.resolve('bar');
  t.is(await bar, 'bar');
});
