var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../db');

function validPassword(user, password) {
  console.log('password', password);
  console.log('user pass', user.password);
  if (user.password === password) {
    return false;
  } else {
    return true;
  }
}

module.exports = function(passport) {

  passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    db.User.findOne({where: { email: username }})
    .then(function(user) {
      console.log('user found', user);
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (validPassword(user, password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
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