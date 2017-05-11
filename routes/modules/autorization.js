/**
 * Created by redgr on 25.04.2017.
 */

var HttpError   = require('../../error').HttpError;
var User        = require('../../models/user').User;
var config      = require('../../config');
var jwt         = require('jsonwebtoken');


exports.autorize = function (req, res, next) {

    var email = req.body.email;
    var password = req.body.password;

    User.checkUser(email, password, function (err, user) {
        if(err) return next(err);
        var payload = { id: user.id };
        var token = jwt.sign(payload, config.get('token-secret'));
        res.json({ token: token });
    });
}

exports.getUserById = function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(500, err.message);
        if (!user) {
            return next(new HttpError(404, "Такой пользователь не найден"));
        }
        res.json({user: user});
    });
};