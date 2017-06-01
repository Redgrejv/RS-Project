/**
 * Created by redgr on 15.04.2017.
 */

"use strict";

var HttpError = require('../error').HttpError;
var mongoose = require('../libs/mongoose');
var path = require('path');
var async = require('async');

var autorize = require('./modules/autorization');
var registration = require('./modules/signup');
var info = require('./modules/info');
var checkToken = require('../middleware/checkToken');
var admin_project = require('./modules/administration_project');

module.exports = function(app, passport) {

    // app.get('/', function(req, res, next) {
    //     res.render('index.html');
    // });

    // app.get('/api/autorize', function(req, res, next) {
    //     res.render('login.html');
    // });

    // app.get('/api/sign-up', function(req, res, next) {
    //     res.render('sign_up.html');
    // });

    app.get('/api/users/logout/:id', checkToken, function(req, res, next) {
        // заготовка под logout юзера
    })

    app.post('/api/autorize', autorize.autorize);
    app.get('/api/user/:id', checkToken, autorize.getUserById);

    app.post('/api/sign-up', registration.post);

    app.get('/api/projects', checkToken, admin_project.getUserAllProject);
    app.post('/api/projects', checkToken, admin_project.insertProject);
    app.patch('/api/projects/:id', checkToken, admin_project.patchProject);
    app.delete('/api/projects/:id', checkToken, admin_project.deleteProject);

    app.post('/api/info/checkEmail', info.checkEmail);
    app.post('/api/info/checkToken', info.checkToken);

};