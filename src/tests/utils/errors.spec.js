import { describe } from 'ava-spec';
import { AppError, HttpError, ServiceError, ModelError } from '../../utils/errors';

const errMessage = 'error message';
const errStatus = 1;
const errExtra = 'extra data';

describe('Errors tests', it => {
  it('AppError instanceof Error', t => {
    t.true(new AppError() instanceof Error);
  });

  it('AppError has required error data', t => {
    try {
      throw new AppError(errMessage, errExtra);
    } catch (err) {
      t.is(err.name, 'AppError');
      t.is(err.message, errMessage);
      t.is(err.extra, errExtra);
    }
  });

  it('AppError has error stack', t => {
    try {
      throw new AppError(errMessage);
    } catch (err) {
      t.truthy(err.stack);
      t.true(err.stack.indexOf('errors.spec.js') !== -1 && err.stack.indexOf(errMessage) !== -1);
    }
  });

  it('HttpError instanceof AppError', t => {
    t.true(new HttpError() instanceof AppError);
  });

  it('HttpError has required error data', t => {
    try {
      throw new HttpError(errStatus, errMessage);
    } catch (err) {
      t.is(err.name, 'HttpError');
      t.is(err.message, errMessage);
    }
  });

  it('ServiceError instanceof AppError', t => {
    t.true(new ServiceError() instanceof AppError);
  });

  it('ServiceError has required error data', t => {
    try {
      throw new ServiceError(errMessage);
    } catch (err) {
      t.is(err.name, 'ServiceError');
      t.is(err.message, errMessage);
    }
  });

  it('ModelError instanceof AppError', t => {
    t.true(new ModelError() instanceof AppError);
  });

  it('ModelError has required error data', t => {
    try {
      throw new ModelError(errMessage);
    } catch (err) {
      t.is(err.name, 'ModelError');
      t.is(err.message, errMessage);
    }
  });
});
