/**
 * Created by redgr on 25.04.2017.
 */

var HttpError   = require('../../error').HttpError;
var User        = require('../../models/user').User;
var jwt         = require('jwt-simple');

exports.authenticate = function (req, res, next) {

    var username = req.body.login;
    var password = req.body.password;

    User.checkUser(username, password, function (err, user) {
        if(err) return next(err);

        var token = jwt.encode(user, 'mongo_database_secret_key');
        res.json({
            user: user,
            sucess: true,
            token: 'JWT' + token
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