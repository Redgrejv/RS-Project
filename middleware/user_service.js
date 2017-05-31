/**
 * Created by redgr on 25.04.2017.
 */

var HttpError = require('../error').HttpError;
var User = require('../models/user').User;
var jwt = require('jsonwebtoken');
var config = require('../config');

exports.signup = function(req, res, next) {

    var data = req.body;
    if (!data.email || !data.password || !data.first_name || !data.last_name) {
        return next(new HttpError(400, 'Заполните все поля!'))
    }

    var new_user = new User({
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name
    });

    User.findOne({ email: new_user.email }, function(err, user) {
        if (err) return next(err);
        if (user) return next(new HttpError(400, "Email уже используется"));

        if (!user && !err) {
            new_user.save(function(err, user) {
                if (err) return next(err);

                var payload = { id: user.id };
                var token = jwt.sign(payload, config.get('token-secret'));
                res.status(200).json({ token: token });
            });
        }


    });
};


exports.login = function(req, res, next) {

    var email = req.body.email;
    var password = req.body.password;

    User.checkUser(email, password, function(err, user) {
        if (err) return next(err);
        var payload = { id: user.id };
        var token = jwt.sign(payload, config.get('token-secret'));

        if (global.socket) {
            global.socket.broadcast.emit('new user', { message: 'Новый пользователь зарегистрирован в сети!' });
        }

        var user_data = {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            _id: user._id,
            about: user.about
        }

        res.json({ token: token, user: user_data });
    });
};

exports.getUserById = function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if (err) return next(err);
        if (!user) {
            return next(new HttpError(404, 'Пользователь не найден.'));
        }
        res.json(user);
    });
};

exports.checkEmail = function(req, res, next) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (user) { return res.status(400, 'Такой email уже занят.'); }

        res.status(404).json({ message: 'Email свободный.' });

    });
}