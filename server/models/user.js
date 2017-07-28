const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// On Save Hook, encrypt password
userSchema.pre('save', function(next) {
  const user = this;

  // generate salt, then run callback
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }

    // hash password using salt
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }

      // overwrite plaintext password
      user.password = hash;
      next();
    });
  });
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export model
module.exports = ModelClass;
