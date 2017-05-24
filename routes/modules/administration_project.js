
var HttpError   = require('../../error').HttpError;
var Project     = require('../../models/projects').Project;
// var mongoose    = require('mongoose');

exports.createProject = function (req, res, next) {
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
    var title = req.body.title;
    var new_title = req.body.new_title;
    var id_user = req.tokenObj.id;

    Project.update({_parent: [id_user], title: title}, {title: new_title}, function (err) {
        if(err) return next(err);

        res.status(200).json({message: 'Данные обновлены'});
    });
};

exports.removeProject = function (req, res, next) {

};

exports.getUserAllProject = function (req, res, next) {
    var user_id = req.tokenObj.id;

    Project.find({_parent: [user_id]}, function (err, projects) {
        if(err) return next(err);

        res.json(projects);
    })
};