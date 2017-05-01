/**
 * Created by redgr on 01.05.2017.
 */

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt  = require('passport-jwt').ExtractJwt;
var config      = require('../config');
var User        = require('./user').User;

module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.get('db:secret');
    passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
        User.find({id: jwtPayload.id}, function (err, user) {
            if(err) return done(err, false);

            if(user) {
                done(null, user)
            }
            else {
                done(null, false);
            }
        })
    }));
};