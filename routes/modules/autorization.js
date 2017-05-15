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
        var payload = { id: user.id };
<<<<<<< HEAD
        var token = jwt.sign(payload, 'secret_key');
        res.json({
            message: 'ok',
            sucess: true,
            token: 'JWT ' + token
        });
=======
        var token = jwt.sign(payload, config.get('token-secret'));

        message = '\$(\'<span>Новый пользователь зашел в систему!</span>\')'+
        '.addClass(\'new_user\')'+
        '.appendTo(\'body\')' +
        '.fadeOut(900, function () {$(this).remove();})';


        if(global.sockets){
            global.sockets.emit('new user', message);
        }

        res.json({ token: token });
>>>>>>> socket.io
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