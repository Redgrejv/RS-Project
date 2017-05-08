/**
 * Created by redgr on 01.05.2017.
 */

var passport    = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User        = require('./user').User;
var HttpError   = require('../error').HttpError;


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    })
});

passport.use('local.signup' , new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, login, password, done) {
    User.findOne({login: login}, function (err, user) {
        if(err) return done(err);

        if(user.email === req.body.email)
            return done(500, 'Email is used');


        var newUser = new User({
            email: req.body.email,
            login: req.body.login,
            password: req.body.password
        });

        newUser.save(function (err) {
            if(err) return done();

            return done(null, newUser);
        });
    });
}));



passport.use('local.login', new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, login, password, done) {

    User.findOne({login: login}, function (err, user) {
        if(err) return done(err);

        if(!user) return done(null, false);

        if(!user.checkPassword(password)) return done(null, false);

        return done(null, user);
    });
}));

module.exports = passport;