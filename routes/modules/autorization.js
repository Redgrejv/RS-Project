/**
 * Created by redgr on 25.04.2017.
 */

var HttpError   = require('../../error').HttpError;
var User        = require('../../models/user').User;
var jwt         = require('jsonwebtoken');

exports.autorize = function (req, res, next) {

    var username = req.body.login;
    var password = req.body.password;

    User.checkUser(username, password, function (err, user) {
        if(err) return next(err);
        var payload = {id: user.id};
        var token = jwt.sign(payload, 'secret_key');
        res.json({
            message: 'ok',
            sucess: true,
            token: 'JWT ' + token
        });
    });
}

exports.getUserById = function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(500, err.message);
        if (!user) {
            return next(new HttpError(404, "User not Found"));
        }
        res.render('user', {user: user});
    });
};