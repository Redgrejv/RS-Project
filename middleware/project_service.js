var HttpError = require('../error').HttpError;
var Project = require('../models/projects').Project;
var async = require('async');

/**
* @function insertProject Добавление нового проекта
* @param  {String} title    {название проекта}
* @param  {ObjectId} userID   {ID пользователя}
* @param  {function} callback {description}
*/
module.exports.insertProject = function (title, userID, callback) {

    async.waterfall([
        function (callback) {
            var new_project = new Project({
                title: title,
                createdBy: userID,
                dateLastModification: Date.now()
            });

            new_project.save(function (err, project) {
                callback(err, project);
            });
        },
        function (project, callback) {
            if (project.errors) callback(project.errors, null);

            callback(null, project);
        }

    ], callback);
};

/**
* @function patchProject Изменение данных заголовка
* @param  {ObjectId} projectID {ID проекта}
* @param  {String} newTitle  {Новый заголовок проекта}
* @param  {function} callback {description}
*/
module.exports.patchProject = function (projectID, newTitle, callback) {

    async.waterfall([
        function (callback) {
            Project.update(
                { _id: projectID },
                { title: newTitle, dateLastModification: Date.now() },
                callback);
        },
        function (project, callback) {
            if (!project) callback(project, null);

            callback(null, project);
        }
    ], callback);
};

/** 
* @function deleteProject
* @param  {ObjectId} projectID {ID проекта}
* @param  {function} callback {description}
*/
module.exports.deleteProject = function (projectID, callback) {

    async.waterfall([
        function (callback) {
            Project.remove({ _id: projectID }, callback)
        },
        function (project, callback) {
            if (!project) callback(project, null);

            callback(null, project);
        }
    ], callback)
};

/**
* @function getAllProject Получение всех проектов пользователя
* @param  {ObjectID} userID {ID пользователя}
* @param  {function} callback {description}
*/
module.exports.getAllProjects = function (userID) {

    await.waterfall([
        function (callback) {
            Project.find({ createdBy: userID }, callback);
        }, function (user, callback) {
            if (!user) return callback(err, null);

            callback(null, user);
        }
    ], callback);
};