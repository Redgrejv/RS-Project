/**
 * Created by redgr on 15.04.2017.
 */

"use strict";

var User        = require('../models/user').User;
var HttpError   = require('../error').HttpError;
var mongoose    = require('../libs/mongoose');
var path        = require('path');
var async       = require('async');
var passport    = require('passport');


var autorize    = require('./modules/autorization');
var registration = require('./modules/registration');
var info = require('./modules/info');

module.exports = function (app) {
    app.get('/', function (req, res, next) {
        res.render('frontpage');
    });

    app.get('/api/login', function (req, res, next){
        res.render('login');
    });

    app.get('/api/register', function (req, res, next){
        res.render('register');
    });

    app.post('/api/login', passport.authenticate(), autorize.authenticate);
    app.get('/api/login/:id', autorize.getUserById);

    app.post('/api/register', registration.post);

    app.get('/api/info/version', info.getVersion);

};
