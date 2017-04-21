/**
 * Created by redgr on 20.04.2017.
 */

"use strict";

var HttpError = require('../error/index').HttpError;
var User = require('../models/user').User;

exports.get = function (req, res) {
    res.render('register');
};

exports.post = function (req, res, next) {

    var data = req.body;
    if (!data['login'] || !data['password']) {
        next(new HttpError(500, 'Invalid data. Plane "login" and "password" is not may empty'))
    }
    var new_user = new User({
        login: data['login'],
        password: data['password'],
        first_name: data['first_name'],
        last_name: data['last_name'],
        about: data['about']
    });


    new_user.save(function (err) {
        if (err) {
            console.log(err);
            next(new HttpError(500, 'Login ' + data['login'] + ' is busy'));
        } else {
            console.log('complete');
        }
    });
};