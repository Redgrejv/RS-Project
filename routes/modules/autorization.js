/**
 * Created by redgr on 25.04.2017.
 */

var HttpError   = require('../../error').HttpError;
var User        = require('../../models/user').User;


exports.autorize = function (req, res, next) {
    var username = req.body.login;
    var password = req.body.password;

    User.autorize(username, password, function (err, user) {
        if(err) return next(err);
        res.render('user', {user: user});
    });
};

exports.findById = function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(500, err.message);
        if (!user) {
            return next(new HttpError(404, "User not Found"));
        }
        res.render('user', {user: user});
    });
};