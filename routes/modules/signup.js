/**
 * Created by redgr on 25.04.2017.
 */

var HttpError   = require('../../error').HttpError;
var User        = require('../../models/user').User;
var config      = require('../../config');
var jwt         = require('jsonwebtoken');

exports.post = function (req, res, next) {

    var data = req.body;
    if(!data.password || !data.email){
        return next(new HttpError(400, 'Заполните все поля!'))
    }

    var new_user = new User({
        email: data.email,
        login: data.login,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name
    });


    new_user.save(function (err, user) {
        if(err) return next(new HttpError(400, 'Email занят.'));

        var token = jwt.sign({id: user.id}, config.get('token-secret'));
        res.status(200).json({token: token});
    });
};