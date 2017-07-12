
var HttpError = require('../error').HttpError;

var redisClient = require('redis').createClient();
var Promise = require('bluebird');
var User = require('../models/user').User;

module.exports = {
    checkSession,
    updateSession
}

function checkSession(token, session, userID) {
    return new Promise(function (resolve, reject) {
        if (!session) {
            userActiveTime(token)
                .then(function (data) {
                    var date = new Date(+data);
                    User.findByIdAndUpdate(userID, { lastActiveTime: date }, function (err, status) {
                        if (err) return next(err);
                    })
                    resolve({ userLastActive: date.toLocaleDateString() });
                })
                .catch(function (err) {
                    reject(err);
                })
            reject(new HttpError(401, 'Сессия не активна'));
        }

        session.lastActiveTime = Date.now();
        updateSession(token, session)
            .then(function (data) {

            })
            .catch(function (err) {
                reject(err);
            })
    })
}

/**
 * Получение данных сессии из редиса по токену
 * @param {ObjectId} токен пользователя
 */
function userActiveTime(token) {
    return new Promise(function (resolve, reject) {
        redisClient.get(token.toString(), function (err, data) {
            if (err) reject(err);
            resolve(data);
        })
    });
}

/**
 * Обновление данных сессии в редис
 * @param {ObjectId} токен пользователя 
 * @param {Session} сессия пользователя 
 */
function updateSession(token, session) {
    return new Promise(function (resolve, reject) {
        redisClient.set(token.toString(), session.lastActiveTime, function (err, data) {
            if (err) return reject(err);
            resolve(data);
        });
    })
}
