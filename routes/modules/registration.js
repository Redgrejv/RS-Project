/**
 * Created by redgr on 25.04.2017.
 */

var HttpError   = require('../../error').HttpError;
var User        = require('../../models/user').User;
var config      = require('../../config');
var jwt         = require('jsonwebtoken');

exports.post = function (req, res, next) {

    var data = req.body;
    if(!data.login || !data.password || !data.email){
        return next(new HttpError(403, 'Заполните все поля!'))
    }

    var new_user = new User({
        email: data.email,
        login: data.login,
        password: data.password
    });


    new_user.save(function (err, user) {
        if(err) {
            if (new RegExp('login_1').test(err.message))
                return next(new HttpError(500, 'Логин занят.'));

            if(new RegExp('email_1').test(err.message))
                return next(new HttpError(500, 'Email занят.'));
        }

        var token = jwt.sign(user.id, config.get('token-secret'));
        res.status(200).json({token: token});
    });
};