/**
 * Created by redgr on 25.04.2017.
 */


var pkginfo = require('pkginfo')(module);
var User = require('../../models/user').User;
var HttpError = require('../../error').HttpError;
var jwt = require('jsonwebtoken');
var config = require('../../config');

module.exports.getVersion = function(req, res, next) {
    res.json(module.exports.version);
};

module.exports.checkEmail = function(req, res, next) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (user) {
            return res
                .status(400)
                .json({ message: 'Такой email уже существует.' });
        }

        res.status(404).json({ message: 'Email свободен' });

    });
}

module.exports.checkToken = function(req, res, next) {
    var token = req.headers['authorization'];

    if (!token) return next(new HttpError(400, 'Нет токена!'));

    try {
        var tokenObj = jwt.verify(token, config.get('token-secret'));
    } catch (e) {
        return next(new HttpError(400, 'Токен не валидный!'));
    }

    res.json({ message: 'Токен валидный', status: true });
};