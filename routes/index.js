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

module.exports = function (app, passport) {
    app.get('/', function (req, res, next) {
        res.render('frontpage');
    });

    app.get('/api/login', function (req, res, next){
        res.render('login');
    });

    app.get('/api/register', function (req, res, next){
        res.render('register');
    });

    // app.post('/api/login', autorize.autorize);
    app.get('/api/login/:id', autorize.getUserById);

    //app.post('/api/register', registration.post);
    app.post('/api/register', passport.authenticate('local.signup', {
        sucessRedirect: 'api/info/user'
    }));

    app.post('/api/login', passport.authenticate('local.login', {
        sucessRedirect: '/api/info/user',
        failureRedirect: '/api/login',
        failureFlash: true
    }));

    app.get('/api/info/version', info.getVersion);

    app.get('/api/info/user', function (req, res) {
        console.log(req.user);
        res.rendr('user', {user: user});
    })

};
