/**
 * Created by redgr on 09.05.2017.
 */

var jwt = require('jsonwebtoken');
var HttpError = require('../error').HttpError;
var config = require('../config');

module.exports = function(req, res, next) {
    var token = req.headers['authorization'];

    if (!token) return next(new HttpError(400, 'Предупреждение. Нет токена!'));

    try {
        var verifyToken = jwt.verify(token, config.get('token-secret'));
    } catch (e) {
        return next(new HttpError(400, 'Токен не валидный!'));
    }

    req.tokenObj = { token: token, userID: verifyToken.id };
    next();
};