const mongoose = require('mongoose');
const { User } = require('../../../models/user');
const auth = require('../../../middlewares/auth');

describe('auth middleware', () => {
  it('should populate req.user with the payload of a valid JWT', () => {
    const user = { _id: mongoose.Types.ObjectId().toHexString(), isAdmin: true };
    const token = new User(user).generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = jest.fn();
    const next = jest.fn();
    auth(req, res, next);
    expect(req.user).toMatchObject(user);
  });
});
