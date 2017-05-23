/**
 * Created by redgr on 15.04.2017.
 */

"use strict";

var HttpError   = require('../error').HttpError;
var mongoose    = require('../libs/mongoose');
var path        = require('path');
var async       = require('async');

var autorize    = require('./modules/autorization');
var registration = require('./modules/signup');
var info = require('./modules/info');
var checkToken = require('../middleware/checkToken');

module.exports = function (app, passport) {

    app.get('/', function (req, res, next) {
        res.render('frontpage.html');
    });

    app.get('/api/autorize', function (req, res, next){
        res.render('login.html');
    });

    app.get('/api/sign-up', function (req, res, next){
        res.render('sign_up.html');
    });

    app.post('/api/autorize', autorize.autorize);
    app.get('/api/user/:id', checkToken, autorize.getUserById);

    app.post('/api/sign-up', registration.post);

    app.get('/api/info/version', checkToken, info.getVersion);

    app.post('/api/info/checkEmail', info.checkEmail);

};
