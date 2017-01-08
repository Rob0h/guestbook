var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
  passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    console.log('user', username);
    console.log('password', password);
    db.User.findOne({ email: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
  ));

  passport.serializeUser(function(user, done) {
    // placeholder for custom user serialization
    // null is for errors
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    // placeholder for custom user deserialization.
    // maybe you are going to get the user from mongo by id?
    // null is for errors
    done(null, user);
  });
};