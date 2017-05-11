/**
 * Created by redgr on 15.04.2017.
 */

"use strict";

var User        = require('../models/user').User;
var HttpError   = require('../error').HttpError;
var mongoose    = require('../libs/mongoose');
var path        = require('path');
var async       = require('async');

var autorize    = require('./modules/autorization');
var signup = require('./modules/signup');
var info = require('./modules/info');
var checkToken = require('../middleware/checkToken');

module.exports = function (app, passport) {

    app.get('/', function (req, res, next) {
        res.render('frontpage');
    });

    app.get('/api/autorize', function (req, res, next){
        res.render('login');
    });

    app.get('/api/signup', function (req, res, next){
        res.render('register');
    });

    app.post('/api/autorize', autorize.autorize);
    app.get('/api/user/:id', checkToken, autorize.getUserById);

    app.post('/api/signup', signup.post);

    app.get('/api/info/version', checkToken, info.getVersion);

    app.post('/api/info/checkEmail', info.checkEmail);

};
