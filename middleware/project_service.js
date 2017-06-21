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
    return new Promise(function (resolve, reject) {
        var new_project = new Project({
            title: title,
            createdBy: userID,
            dateLastModification: Date.now()
        });

        new_project.save(function (err, project) {
            if (err) return reject(err);
            resolve(project);
        });
    });
};

/**
* Изменение данных проекта
* @param  {ObjectId} projectID {ID проекта}
* @param  {String} newTitle  {Новый заголовок проекта}
*/
function patchProject(projectID, newTitle) {
    return new Promise(function (resolve, reject) {
        Project.update(
            { _id: projectID },
            { title: newTitle, dateLastModification: Date.now() },
            resolve);
    })
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
function getAllProjects(userID, callback) {

    async.waterfall([
        function (callback) {
            Project.find({ createdBy: userID }, callback);
        }, function (user, callback) {
            if (!user) return callback(err, null);

            callback(null, user);
        }
    ], callback);
};