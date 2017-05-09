/**
 * Created by redgr on 25.04.2017.
 */

var HttpError   = require('../../error').HttpError;
var User        = require('../../models/user').User;

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


    new_user.save(function (err) {
        if(err) {
            console.log(err);
            return next(new HttpError(500, 'Логин или email заняты.'));
        }else {
            console.log('complete');
            res.end('Успешно', 200);
        }
    });
};