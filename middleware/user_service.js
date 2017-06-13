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

function signup(data = { email, password, first_name, last_name }) {
    Promise.resolve(function (data) {
        return User.findOne({ email: data.email });
    }).then(function(user){
        console.log(user);
    }).catch(function (err) {
        console.log(err);
    })
}



// function signup(data = { email, password, first_name, last_name }, callback) {

//     async.waterfall([
//         function(callback) {
//             User.findOne({ email: data.email }, callback);
//         },
//         function(user, callback) {

            
//         }
//     ], callback);
// };


function login(email, password, callback) {

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

function getUserById(id_user, callback) {
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

function checkEmail(email, callback) {
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


