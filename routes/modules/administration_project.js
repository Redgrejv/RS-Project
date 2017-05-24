
var HttpError   = require('../../error').HttpError;
var Project     = require('../../models/projects').Project;
// var mongoose    = require('mongoose');

exports.createProject = function (req, res, next) {
    console.log(req.tokenObj);

    var title = req.body.title;
    var id_user = req.tokenObj.id;

    var new_project = new Project({
        title: title,
        _parent: [id_user]
    });

    console.log(new_project);
    new_project.save(function (err) {
        if(err) return next(err);

        res.json({message: 'Проект успешно сохранен'});
    })
};

exports.updateProject = function (req, res, next) {

};

exports.removeProject = function (req, res, next) {

};