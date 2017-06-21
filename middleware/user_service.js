var HttpError = require('../error').HttpError;
var User = require('../models/user').User;
var jwt = require('jsonwebtoken');
var config = require('../config');
var async = require('async');
var valid = require('../utils/validation');


module.exports.signup = function(data = { email, password, first_name, last_name }, callback) {

    async.waterfall([
        function(callback) {
            User.findOne({ email: data.email }, callback);
        },
        function(user, callback) {

            if (user) return callback(new HttpError(400, "Email уже используется"));

            if (!valid.email(data.email)) {
                return callback(new HttpError(400, 'Email не валидный'));
            }

            if (!valid.password(data.password)) {
                return callback(new HttpError(400, 'Пароль не валидный'));
            }

            if (!valid.names(data.first_name)) {
                return callback(new HttpError(400, 'Имя не валидно'));
            }

            if (!valid.names(data.last_name)) {
                return callback(new HttpError(400, 'Фамилия не валидна'));
            }

            var new_user = new User({
                email: data.email,
                password: data.password,
                first_name: data.first_name,
                last_name: data.last_name
            });

            new_user.save(function(err, user) {
                if (err) return callback(err, null);

                callback(null, user);
            });
        }
    ], callback);
};


module.exports.login = function(email, password, callback) {

    async.waterfall([
        function(callback) {
            User.findOne({ email: email }, callback);
        },
        function(user, callback) {
            if (user) {
                if (user.checkPassword(password)) {
                    callback(null, user);
                } else {
                    callback(new HttpError(400, "Пароль не верен"));
                }
            } else {
                callback(new HttpError(404, "Пользователь не найден"));
            }
        }
    ], callback);
};

module.exports.getUserById = function(id_user, callback) {
    async.waterfall([
        function(callback) {
            User.findById(id_user, function(err, user) {
                if (err) callback(err, null);

                callback(null, user);

            });
        },
        function(user, callback) {
            if (!user) {
                callback(new HttpError(404, 'Пользователь не найден.'), null);
            } else
                callback(null, user);
        }
    ], callback);


};

module.exports.checkEmail = function(email, callback) {
    async.waterfall([
        function(callback) {
            User.findOne({ email: email }, callback);
        },
        function(user, callback) {
            if (user) {
                callback(null, false);
            } else {
                callback(null, true);
            }
        }
    ], callback);
}