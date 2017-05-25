/**
 * Created by redgr on 25.04.2017.
 */

var HttpError   = require('../../error').HttpError;
var User        = require('../../models/user').User;
var jwt         = require('jsonwebtoken');
var config      = require('../../config');


exports.autorize = function (req, res, next) {

    var email = req.body.email;
    var password = req.body.password;

    User.checkUser(email, password, function (err, user) {
        if(err) return next(err);
        var payload = { id: user.id };
        var token = jwt.sign(payload, config.get('token-secret'));

        if(global.socket){
            global.socket.broadcast.emit('new user', {message: 'Новый пользователь зарегистрирован в сети!'});
        }

        res.json({ token: token, user: user });
    });
};

exports.getUserById = function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        if (!user) {
            return next(new HttpError(404, "Такой пользователь не найден."));
        }
        res.json(user);
    });
};