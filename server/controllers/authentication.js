const User = require('../models/user');

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  // See if a user with given email exists
  User.findOne({ email, password }, (err, existingUser) => {
    // If a user with email does exist, return error

  });

  // If a user with email does not exist, create and save user record

  // Respond to request
};
