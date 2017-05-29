/**
 * Created by redgr on 25.04.2017.
 */

var HttpError   = require('../../error').HttpError;
var User        = require('../../models/user').User;
var jwt         = require('jsonwebtoken');
var config      = require('../../config');

exports.post = function (req, res, next) {

    var data = req.body;
    if(!data.email || !data.password || !data.first_name || !data.last_name){
        return next(new HttpError(400, 'Заполните все поля!'))
    }

    var new_user = new User({
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name
    });

    User.findOne({email: new_user.email}, function (err, user) {
        if(err) return next(err);
        if(user) return next(new HttpError(400, "Email уже используется"));

        if(!user && !err) {
            new_user.save(function (err, user) {
                if(err) return next(err);
                
                var payload = { id: user.id };
                var token = jwt.sign(payload, config.get('token-secret'));
                res.status(200).json({token: token});
            });
        }


    });
};