var HttpError = require('../error').HttpError;
var Project = require('../models/projects').Project;
var async = require('async');

module.exports = {
    insertProject,
    patchProject,
    deleteProject,
    getAllProjects
}

/**
* Добавление нового проекта
* @param  {String} title    {название проекта}
* @param  {ObjectId} userID   {ID пользователя}
*/
function insertProject(title, userID, callback) {

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
function patchProject(projectID, newTitle, callback) {

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
* Удаление проекта
* @param  {ObjectId} projectID - ID проекта
*/
function deleteProject(projectID) {

    return new Promise(function (resolve, reject) {
        Project.remove({ _id: projectID }, function (err, project) {
            if (err) reject(err);
            resolve(project);
        })
    })
};

/**
* Получение всех проектов пользователя
* @param  {ObjectID} userID {ID пользователя}
*/
module.exports.getAllProjects = function (userID, callback) {

    async.waterfall([
        function (callback) {
            Project.find({ createdBy: userID }, callback);
        }, function (user, callback) {
            if (!user) return callback(err, null);

            callback(null, user);
        }
    ], callback);
};