// Importing database models
const User = require('../models/user');

// Importing npm packages
const bcrypt = require('bcryptjs');

// Importing utility functions
const tokenGenerator = require('../utility/tokenGenerator');
const throwError = require('../utility/throwError');

// Login function generate token based on user availability
exports.login = (req, res) => {
  let savedUser;
  User.findOne({
    $or: [{ userName: req.body.userName }, { emailId: req.body.userName }],
  })
    .then((user) => {
      if (!user) {
        const error = new Error('Username or email does not exist');
        error.statusCode = 404;
        throw error;
      }
      savedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((isMatch) => {
      if (!isMatch) {
        const error = new Error('Password does not match');
        error.statusCode = 401;
        throw error;
      }
      const token = tokenGenerator({
        emailId: savedUser.emailId,
        userName: savedUser.userName,
        userId: savedUser._id,
      });
      res
        .status(200)
        .json({ message: 'Success', token: token, user: savedUser });
    })
    .catch((err) => {
      return throwError(err, res);
    });
};
