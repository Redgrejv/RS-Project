/**
 * Created by redgr on 01.05.2017.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./user').User;
var HttpError = require('../error').HttpError;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    })
});

module.exports = passport;
