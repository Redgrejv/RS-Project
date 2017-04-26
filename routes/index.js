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


    app.post('/api/login', autorize.autorize);
    app.get('/api/login/:id', autorize.findById);

    app.post('/api/register', registration.post);

    app.get('/api/info/version', info.version);

};
