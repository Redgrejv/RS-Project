/**
 * Created by redgr on 09.05.2017.
 */

var jwt = require('jsonwebtoken');
var HttpError = require('../error').HttpError;
var config = require('../config');

var session = require('./redis-session');

module.exports = function (req, res, next) {
    var token = req.headers['authorization'];

    if (!token) return next(new HttpError(400, 'Нет токена!'));

    try {
        var verifyToken = jwt.verify(token, config.get('token-secret'));
    } catch (e) {
        return next(new HttpError(401, 'Токен не валидный!'));
    }

    console.log(req.session);

    // session.checkSession(token, req.session, verifyToken.id)
    //     .then(function (data) {
    //         if (data) {
    //             return next(new HttpError(401, 'Время последней активности пользователя ' + data));
    //         }
    //     })
    //     .catch(function (err) {
    //         return next(err);
    //     })

    req.tokenObj = { token: token, userID: verifyToken.id };
    next();
};