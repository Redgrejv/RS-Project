/**
 * Created by redgr on 15.04.2017.
 */

"use strict";

var HttpError = require('../error').HttpError;
var mongoose = require('../libs/mongoose');
var path = require('path');
var async = require('async');

var info = require('../middleware/info');
var checkToken = require('../utils/checkToken');
var user_service = require('../middleware/user_service');
var project_service = require('../middleware/project_service');

module.exports = function(app, passport) {

    app.get('/api/users/:id', checkToken, user_service.getUserById);
    app.post('/api/users/login', user_service.login);
    app.post('/api/users/signup', user_service.signup);
    app.post('/api/users/checkEmail', user_service.checkEmail);

    app.get('/api/projects/:id/user', checkToken, project_service.getUserAllProject);
    app.post('/api/projects', checkToken, project_service.insertProject);
    app.patch('/api/projects/:id', checkToken, project_service.patchProject);
    app.delete('/api/projects/:id', checkToken, project_service.deleteProject);

};