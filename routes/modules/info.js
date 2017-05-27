/**
 * Created by redgr on 25.04.2017.
 */


var pkginfo = require('pkginfo')(module);
var User = require('../../models/user').User;
var HttpError = require('../../error').HttpError;
var jwt = require('jsonwebtoken');

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

module.exports.validToken = function(req, res) {
    var token = req.headers['authorization'];

    if (!token) return next(new HttpError(400, 'Нет токена!'));

    try {
        var tokenObj = jwt.verify(token, 'secret_key');
    } catch (e) {
        return next(new HttpError(400, 'Токен не валидный!'));
    }

    req.json({ message: 'Токен валидный', status: true });
};