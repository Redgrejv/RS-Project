/**
 * Created by redgr on 25.04.2017.
 */

var HttpError   = require('../../error').HttpError;
var User        = require('../../models/user').User;

exports.post = function (req, res, next) {

    var data = req.body;
    if(!data.login || !data.password){
        return next(new HttpError(403, 'Invalid data. Plane "login" and "password" is not may empty'))
    }

    var new_user = new User({
        login: data.login,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        about: data.about
    });


    new_user.save(function (err) {
        if(err) {
            console.log(err);
            return next(new HttpError(500, 'Login ' + data['login'] + ' is busy'));
        }else{
            console.log('complete');
            res.status(200);
        }
    });
};