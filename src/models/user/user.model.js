import Waterline from 'waterline';
import bcrypt from 'bcrypt';

const User = Waterline.Collection.extend({
  identity: 'user',
  connection: 'mongodb',
  migrate: 'safe',
  attributes: {
    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    classes: {
      type: 'array',
    },
    toJSON() {
      const obj = this.toObject();
      delete obj.password;
      return obj;
    },
  },
  beforeCreate(values, next) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);

      return bcrypt.hash(values.password, salt, (hashErr, hash) => {
        if (hashErr) return next(hashErr);
        values.password = hash;
        return next();
      });
    });
  },
});
export default User;
