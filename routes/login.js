"use strict";

var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
var async = require('async');

exports.get = function (req, res) {
    res.render('login');
};

exports.post = function (req, res, next) {
    var username = req.body.login;
    var password = req.body.password;

    async.waterfall([
        function (callback) {
            User.findOne({login: username}, callback);
        },
        function (user, callback) {
            if(user) {
                if (user.checkPassword(password)) {
                    callback(null, user);
                }else{
                    next(new HttpError(403, "Пароль не верен"));
                }
            }
        }
    ], function (err, user) {
        if(err) return next(err);
        req.session.user = user._id;
        res.send({});
    });
};