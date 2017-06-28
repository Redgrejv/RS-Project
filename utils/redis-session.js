
var HttpError = require('../error').HttpError;

var redisClient = require('redis').createClient();
var Promise = require('bluebird');
var User = require('../models/user').User;


module.exports = function (req, res, next) {
    if (!req.session) {
        userActiveTime(token)
            .then(function (data) {
                var date = new Date(+data);
                User.findByIdAndUpdate(req.tokenObj.id, { lastActiveTime: date }, function (err, status) {
                    if (err) return next(err);
                })

                res.status(401).json({ userLastActive: date.toLocaleDateString(), message: 'Вы не авторизованы' });
            })
            .catch(function (err) {
                return next(err);
            })
    }

    req.session.lastActiveTime = Date.now();

    updateSession(req.tokenObj.token, req.session)
        .then(function (data) {

        })
        .catch(function (err) {
            return next(err);
        })

    next();
}

function userActiveTime(token) {
    return new Promise(function (resolve, reject) {
        redisClient.get(token.toString(), function (err, data) {
            if (err) reject(err);
            resolve(data);
        })
    });
}

function updateSession(token, session) {
    return new Promise(function (resolve, reject) {
        redisClient.set(token.toString(), session.lastActiveTime, function (err, data) {
            if (err) return reject(err);
            resolve(data);
        });
    })
}

module.exports.updateSession = updateSession;