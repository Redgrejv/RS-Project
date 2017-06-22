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
* Авторизация пользователя в БД по задынным параметрам
* @param  {String} email    {email} - почта пользователя
* @param  {String} password {password} - пароль пользователя
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

/**
 * Регистрация пользователя
 * @param {String} email - почта пользователя
 * @param {String} password - пароль пользователя
 * @param {String} first_name - имя пользователя
 * @param {String} last_name - фамилия пользователя
 */
function signup(email, password, first_name, last_name) {
    return new Promise(function (resolve, reject) {
        User.findOne({ email: email }, function (err, user) {
            if (user) return reject(new HttpError(400, 'Такой email уже используется'));

            var new_user = new User({
                email: email,
                password: password,
                first_name: first_name,
                last_name: last_name
            });

            new_user.save(function (err, user) {
                if (err) reject(err);
                resolve(user);
            });
        })
    })
};

/**
 * Получение данных пользователя по ID
 * @param {ObjectId} userID - id пользователя 
 */
function getUserById(userID) {
    return new Promise(function (reject, resolve) {
        User.findById(userID, function (err, user) {
            if (err) return reject(new HttpError(404, 'Пользователь не найден' || err));

            resolve(user);
        })
    })
};

/**
 * Проверка email в БД
 * @param {String} email - почта пользователя 
 */
function checkEmail(email) {

    return new Promise(function (resolve, reject) {
        User.findOne({ email: email }, function (err, user) {
            if (user) reject(user);

            resolve(err);
        })
    })
}


