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
var Promise = require('bluebird');
var User = require('../models/user').User;

module.exports = function (app, redisClient) {

    // Завершение сессии пользователя
    app.get('/api/users/logout/:id', checkToken, function (req, res, next) {
        req.session.destroy(function (err) {
            if (err) return next(err);

            redisClient.set(req.params.id, 'nil');
            res.send('Logout');
        });

    })

    // Получение данных юзера по ID
    app.get('/api/users/:id', checkToken, function (req, res, next) {
        var id = req.params.id;

        user_service.getUserById(id, function (err, user) {
            if (!err) return next(err);

            res.json(choiseUserData(user));
        });
    });

    // Авторизация юзера
    app.post('/api/users/login', function (req, res, next) {
        var data = req.body;
        validUserData(data, next);

        if (!data.password) return next(new HttpError(400, 'Поле пароля не можт быть пустым'));

        user_service.login(data.email, data.password)
            .then(function (user) {
                var user_data = choiseUserData(user);
                var token = generationToken(user._id);

                if (global.socket) {
                    global.socket.broadcast.emit('new user', { message: 'Новый пользователь зарегистрирован в сети!' });
                }

                redisClient.set(user_data.id.toString(), token, function (err, res) {
                    if (err) return next(err);
                    updateUserLastActive(user_data.id);
                    req.session.user = { userID: user_data.id }
                });

                res.json({ token: token, user: user_data });
            }).catch(function (err) {
                return next(err);
            });
    });

    // Регистрация нового пользователя
    app.post('/api/users/signup', function (req, res, next) {
        var data = req.body;

        validUserData(data, next);

        user_service.signup({
            email: data.email,
            password: data.password,
            first_name: data.first_name,
            last_name: data.last_name
        },
            function (err, user) {
                if (err) return next(err);

                var user_data = choiseUserData(user);
                var token = generationToken(user._id);

                redisClient.set(user_data.id.toString(), token, function (err, res) {
                    if (err) return next(err);
                    updateUserLastActive(user_data.id);
                    req.session.user = { userID: user_data.id }
                });

                res.json({ token: token, user: user_data });
            })
    });

    // Проверка на существование в БД Email`a
    app.post('/api/users/checkEmail', function (req, res, next) {
        var email = req.body.email;

        if (!valid.email(email)) {
            return next(new HttpError(400, 'Email не валидный'));
        }

        user_service.checkEmail(email, function (err, status) {
            if (!status) { return res.status(400).json('Email занят.') }

            res.status(404).json('Email свободен.');
        })
    });

    // Получение всех проектов конкретного пользователя
    app.get('/api/projects/:id/user', checkToken, function (req, res, next) {
        var id = req.params.id;

        project_service.getAllProjects(id, function (err, projects) {
            if (err) return next(err);

            res.json(projects);
        })
    });

    // Создание нового проекта
    app.post('/api/projects', checkToken, function (req, res, next) {
        var title = req.body.title;
        var id = req.tokenObj.userID;

        if (!valid.names(title, { minLength: 1, maxLength: 26 })) {
            return next(new HttpError(400, 'Поле заголовка не может быть пустым.'));
        }

        project_service.insertProject(title, id, function (err, project) {
            res.json({ project: project });
        })
    });

    // Изменение данных проекта
    app.patch('/api/projects/:id', checkToken, function (req, res, next) {
        var projectID = req.params.id;
        var newTitle = req.body.newTitle;

        if (!valid.names(newTitle, { minLength: 1, maxLength: 26 })) {
            return next(new HttpError(400, 'Поле заголовка не может быть пустым.'));
        }

        project_service.patchProject(projectID, newTitle, function (err, project) {
            if (err) return next(err);
            res.json(project);
        });
    });

    // Удаление проекта
    app.delete('/api/projects/:id', checkToken, function (req, res, next) {
        var projectID = req.params.id;


        project_service.deleteProject(projectID, function (err, project) {
            if (err) return next(err);

            res.json(project);
        })

    });

}


/**
 * @function Фильтрация данных пользователя
 * @param  {JSON} user {Данные пользователя из БД}
 * @return {type} {JSON}
 */
function choiseUserData(user) {
    var user_data = {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        id: user._id,
        created: user.created,
        lastActiveTime: user.lastActiveTime
    }

    return user_data;
}

/**
 * @function Генерация токена на основе ID пользователя
 * @param  {ObjectID} userID {ID юзера из БД}
 * @return {type} {String}
 */
function generationToken(userID) {
    var payload = { id: userID };
    var token = jwt.sign(payload, config.get('token-secret'));

    return token;
}

/**
 * @function Выделение данных токена из запроса
 * @param {Object} request - запрос от клиента
 */
function getTokenObject(request) {
    var userID = request.tokenObj.userID;
    var userToken = request.tokenObj.roken;

    return {
        userID,
        userToken
    }
}

/**     
* @function Обновление времени последней активномти пользователя
* @param  {ObjectId} userID {id пользователя}
*/
function updateUserLastActive(userID) {
    User.findByIdAndUpdate(
        userID,
        { lastActiveTime: Date.now() },
        { new: true },
        function (err, model) {
            if (err) return err;
        }
    );
}

function validUserData(data, next) {
    if (!valid.email(data.email)) return next(new HttpError(400, 'Email не валидный'));
    if (!valid.password(data.password)) return next(new HttpError(400, 'Пароль не валидный'));
    if (!valid.names(data.first_name)) return next(new HttpError(400, 'Имя не валидно'));
    if (!valid.names(data.last_name)) return next(new HttpError(400, 'Фамилия не валидна'));
}