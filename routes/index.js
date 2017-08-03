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

var session = require('../libs/redis-session');
var Promise = require('bluebird');


module.exports = function (app, redisClient) {

    // Завершение сессии пользователя
    app.get('/api/users/logout/:id', checkToken, function (req, res, next) {
        req.session.destroy(function (err) {
            if (err) return next(err);

            redisClient.del(req.tokenObj.token, function (err) {
                if (err) return next(err);

                res.json('Logout');
            });
        })
    })

    // Получение данных юзера по ID
    app.get('/api/users/:id', checkToken, function (req, res, next) {
        var userID = req.params.id;

        user_service.getUserById(id)
            .then(function (user) {
                res.json(choiseUserData(user));
            })
            .catch(function (err) {
                return next(err);
            })
    });

    // Авторизация юзера
    app.post('/api/users/login', function (req, res, next) {
        var data = req.body;

        if (!valid.email(data.email)) return next(new HttpError(400, 'Email не валидный'));
        if (!valid.password(data.password)) return next(new HttpError(400, 'Пароль не валидный'));

        user_service.login(data.email, data.password)
            .then(function (user) {
                var user_data = choiseUserData(user);
                var token = generationToken(user_data.id);

<<<<<<< HEAD
                req.session.user = { lastActiveTime: Date.now() }

                // req.jwtSession.create(user_data.id, function (err, token) {
                //     if (err) return next(err);
                //     console.log(req.jwtSession);
                //     res.json({ token: token, user: user_data });
                // })
=======
                if (global.socket) {
                    global.socket.broadcast.emit('new user', { message: 'Новый пользователь зарегистрирован в сети!' });
                }

                req.session.lastActiveTime = Date.now();
                // session.updateSession(token, req.session);
>>>>>>> ee10a4934babaa4ee37201401ca2687b2afb4a84
                console.log(req.session);
                res.json({ token: token, user: user_data });
            }).catch(function (err) {
                return next(err);
            });
    });

    // Регистрация нового пользователя
    app.post('/api/users/signup', function (req, res, next) {
        var data = req.body;
        if (!valid.email(data.email)) return next(new HttpError(400, 'Email не валидный'));
        if (!valid.password(data.password)) return next(new HttpError(400, 'Пароль не валидный'));
        if (!valid.names(data.first_name)) return next(new HttpError(400, 'Имя не валидно'));
        if (!valid.names(data.last_name)) return next(new HttpError(400, 'Фамилия не валидна'));

        user_service.signup(data.email, data.password, data.first_name, data.last_name)
            .then(function (user) {
                var user_data = choiseUserData(user);
                var token = generationToken(user._id);

                redisClient.set(user_data.id.toString(), token, function (err, res) {
                    if (err) return next(err);
                    updateUserLastActive(user_data.id);
                });

                // req.session.lastActiveTime = Date.now();
                // session.updateSession(token, req.session);
                res.json({ token: token, user: user_data });
            })
            .catch(function (err) {
                return next(err);
            });
    });

    // Проверка на существование в БД Email`a
    app.post('/api/users/checkEmail', function (req, res, next) {
        var email = req.body.email;

        if (!valid.email(email)) return next(new HttpError(400, 'Email не валидный'));

        user_service.checkEmail(email)
            .then(function () {
                res.status(404).json('Email свободен.');
            })
            .catch(function (err) {
                return res.status(400).json('Email занят.');
            })
    });

    // Получение всех проектов конкретного пользователя
    app.get('/api/projects/:id/user', checkToken, function (req, res, next) {

        var userID = req.params.id;

        project_service.getAllProjects(userID)
            .then(function (projects) {
                res.json(projects);
            })
            .catch(function (err) {
                return next(err);
            })
    });

    // Создание нового проекта
    app.post('/api/projects', checkToken, function (req, res, next) {
        var title = req.body.title;
        var maxLength = 16;

        if (!valid.names(title, { minLength: 1, maxLength: maxLength }))
            return next(new HttpError(400, 'Поле заголовка не может быть пустым или первышать ' + maxLength + ' символов.'));

        project_service.insertProject(title, req.tokenObj.userID)
            .then(function (project) {
                res.json({ project: project });
            })
            .catch(function (err) {
                return next(err);
            })
    });

    // Изменение данных проекта
    app.patch('/api/projects/:id', checkToken, function (req, res, next) {
        var projectID = req.params.id;
        var newTitle = req.body.newTitle;

        if (!valid.names(newTitle, { minLength: 1, maxLength: 16 }))
            return next(new HttpError(400, 'Поле заголовка не может быть пустым или превышать 16 символов'));


        project_service.patchProject(projectID, newTitle)
            .then(function (project) {
                res.json("Проект успешно переименован");;
            }).catch(function (err) {
                return next(err);
            });
    });

    // Удаление проекта
    app.delete('/api/projects/:id', checkToken, function (req, res, next) {
        var projectID = req.params.id;

        project_service.deleteProject(projectID)
            .then(function (project) {
                res.json(project);
            })
            .catch(function (err) {
                next(err);
            })

    });
};


/**
 * Фильтрация данных пользователя
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
 * Генерация токена на основе ID пользователя
 * @param  {ObjectID} userID {ID юзера из БД}
 * @return {type} {String}
 */
function generationToken(userID) {
    var payload = { id: userID };
    var token = jwt.sign(payload, config.get('session:key'));

    return token;
}

/**
 * Выделение данных токена из запроса
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

// /**     
// * Обновление времени последней активномти пользователя
// * @param  {ObjectId} userID - ID пользователя
// */
// function updateUserLastActive(userID) {
//     User.findByIdAndUpdate(
//         userID,
//         { lastActiveTime: Date.now() },
//         { new: true },
//         function (err, model) {
//             if (err) return err;
//         });
// }