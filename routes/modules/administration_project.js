
var HttpError   = require('../../error').HttpError;
var Project     = require('../../models/projects').Project;
// var mongoose    = require('mongoose');

function getReqData(req){

    return data = {
        title: req.body.title,
        id_user: req.tokenObj.id
    };
}

exports.createProject = function (req, res, next) {
    var data = getReqData(req);

    var new_project = new Project({
        title: data.title,
        _parent: [data.id_user]
    });

    console.log(new_project);
    new_project.save(function (err) {
        if(err) return next(err);

        res.json({message: 'Проект успешно сохранен'});
    })
};

exports.updateProject = function (req, res, next) {
    var data = getReqData(req);

    var new_title = req.body.new_title;

    Project.update({_parent: [data.id_user], title: data.title}, {title: new_title}, function (err) {
        if(err) return next(err);

        res.json({message: 'Данные обновлены'});
    });
};

exports.removeProject = function (req, res, next) {
    var data = getReqData(req);
    var _id_project = req.data.id;

    Project.remove({_parent: [data.user_id], _id: _id_project}, function (err, result) {
        if(err) return next(err);

        res.json({message: 'Проект удален'});
    })
};

exports.getUserAllProject = function (req, res, next) {
    var data = getReqData(req);

    Project.find({_parent: [data.user_id]}, function (err, projects) {
        if(err) return next(err);

        res.json(projects);
    })
};