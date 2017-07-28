const User = require('../models/user');

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({
      error: "You must provide email and password"
    });
  }

  // See if a user with given email exists
  User.findOne({ email, password }, (err, existingUser) => {
    if (err) { return next(err); }

    // If a user with email does exist, return error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use '});
    }

    // If a user with email does not exist, create and save user record
    const user = new User({ email, password });

    user.save((err) => {
      if (err) { return next(err); }

      // Respond to request
      res.json(user);
    });
  });


};
