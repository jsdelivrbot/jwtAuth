const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const { JwtStrategy, ExtractJwt } = require('passport-jwt');

const jwtOptions = {};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if payload.user_id is in db
  User.findById(payload.sub, (err, user) => {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done (null, false);
    }
  });
});
