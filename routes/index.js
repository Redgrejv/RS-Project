"use strict";

var HttpError = require('../error').HttpError;
var mongoose = require('../libs/mongoose');
var path = require('path');
var async = require('async');
var jwt = require('jsonwebtoken');
var config = require('../config');

var info = require('../middleware/info');
var checkToken = require('../utils/checkToken');
var user_service = require('../middleware/user_service');
var project_service = require('../middleware/project_service');
var valid = require('../utils/validation');

module.exports = function(app, passport) {

    // Получение данных юзера по ID
    app.get('/api/users/:id', checkToken, function(req, res, next) {
        var id = req.params.id;

        user_service.getUserById(id, function(err, user) {
            if (!err) return next(err);

            res.json(choiseUserData(user));
        });
    });

    // Авторизация юзера
    app.post('/api/users/login', function(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;

        if (!valid.email(email)) {
            return next(new HttpError(400, 'Email не валидный'));
        }

        user_service.login(email, password, function(err, user) {
            if (err) return next(err);

            var user_data = choiseUserData(user);
            var token = generationToken(user._id);

            if (global.socket) {
                global.socket.broadcast.emit('new user', { message: 'Новый пользователь зарегистрирован в сети!' });
            }

            res.json({ token: token, user: user_data });
        });
    });

    // Регистрация нового пользователя
    app.post('/api/users/signup', function(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;

        user_service.signup({
                email: email,
                password: password,
                first_name: first_name,
                last_name: last_name
            },
            function(err, user) {
                if (err) return next(err);
                var user_data = choiseUserData(user);
                var token = generationToken(user._id);

                res.json({ token: token, user: user_data });
            })

    });

    // проверка на существование в БД Email`a
    app.post('/api/users/checkEmail', function(req, res, next) {
        var email = req.body.email;

        if (!valid.email(email)) {
            return next(new HttpError(400, 'Email не валидный'));
        }

        user_service.checkEmail(email, function(err, status) {
            if (!status) { return res.status(400).json('Email занят.') }

            res.status(404).json('Email свободен.');
        })

    });

    app.get('/api/projects/:id/user', checkToken, project_service.getUserAllProject);
    app.post('/api/projects', checkToken, project_service.insertProject);

    app.patch('/api/projects/:id', checkToken, function(req, res, next) {

    });

    app.delete('/api/projects/:id', checkToken, project_service.deleteProject);

};

function choiseUserData(user) {
    var user_data = {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        id: user._id
    }

    return user_data;
}

function generationToken(userID) {
    var payload = { id: userID };
    var token = jwt.sign(payload, config.get('token-secret'));

    return token;
}