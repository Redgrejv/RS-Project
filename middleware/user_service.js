var HttpError = require('../error').HttpError;
var User = require('../models/user').User;
var jwt = require('jsonwebtoken');
var config = require('../config');
var async = require('async');
var valid = require('../utils/validation');
var Promise = require('bluebird');

module.exports = {
    signup,
    login,
    getUserById,
    checkEmail
}

/**         
* @function Проверка пользователя в БД по задынным параметрам
* @param  {String} email    {email} - почта пользователя
* @param  {String} password {password} - пароль пользователя
* @return {Promise}
*/
function login(email, password) {
    return new Promise(function (resolve, reject) {
        User.findOne({ email: email }, function (err, user) {
            if (err) return reject(err);
            if (!user) return reject(new HttpError(404, 'Пользователь не найден'));

            if (user.checkPassword(password)) resolve(user);
            else
                reject(new HttpError(400, 'Пароль не верен'));
        });
    });
}

function signup(data = { email, password, first_name, last_name }, callback) {

    async.waterfall([
        function (callback) {
            User.findOne({ email: data.email }, callback);
        },
        function (user, callback) {

            if (user) return callback(new HttpError(400, "Email уже используется"));

            var new_user = new User({
                email: data.email,
                password: data.password,
                first_name: data.first_name,
                last_name: data.last_name
            });

            new_user.save(function (err, user) {
                if (err) return callback(err, null);

                callback(null, user);
            });
        }
    ], callback);
};

function getUserById(id_user, callback) {
    async.waterfall([
        function (callback) {
            User.findById(id_user, function (err, user) {
                if (err) callback(err, null);

                callback(null, user);

            });
        },
        function (user, callback) {
            if (!user) {
                callback(new HttpError(404, 'Пользователь не найден.'), null);
            } else
                callback(null, user);
        }
    ], callback);


};

function checkEmail(email, callback) {
    async.waterfall([
        function (callback) {
            User.findOne({ email: email }, callback);
        },
        function (user, callback) {
            if (user) {
                callback(null, false);
            } else {
                callback(null, true);
            }
        }
    ], callback);
}


