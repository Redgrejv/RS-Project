/**
 * Created by redgr on 01.05.2017.
 */

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt  = require('passport-jwt').ExtractJwt;
var User        = require('./user').User;

module.exports = function (passport) {
    var jwtOptions = {};
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
    jwtOptions.secretOrKey = 'secret_key';


    new JwtStrategy(jwtOptions, function (jwtPayload, next) {
        User.find({id: jwtPayload.id}, function (err, user) {
            if(err)
                return next(err, false);
            if(user) {
                next(null, user)
            }
            else {
                next(null, false);
            }
        })
    });
};