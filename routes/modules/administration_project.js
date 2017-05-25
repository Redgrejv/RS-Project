var HttpError = require('../../error').HttpError;
var Project = require('../../models/projects').Project;
// var mongoose    = require('mongoose');

function getReqData(req) {
    return data = {
        title: req.body.title,
        id_user: req.tokenObj.id,
        id_project: req.body.projectID
    };
}

exports.createProject = function(req, res, next) {
    var data = getReqData(req);

    var new_project = new Project({
        title: data.title,
        _parent: [data.id_user]
    });

    console.log(new_project);
    new_project.save(function(err) {
        if (err) return next(err);

        res.json({ message: 'Проект успешно сохранен' });
    })
};

exports.updateProject = function(req, res, next) {
    var data = getReqData(req);

    var new_title = req.body.new_title;

    Project.update({ _parent: [data.id_user], title: data.title, _id: data.id_project }, { title: new_title }, function(err) {
        if (err) return next(err);

        res.json({ message: 'Данные обновлены' });
    });
};

exports.removeProject = function(req, res, next) {
    var data = getReqData(req);

    Project.remove({ _parent: [data.id_user], _id: data.id_project }, function(err, result) {
        if (err) return next(err);

        if (result.result.n == 0)
            res.status(404).json({ message: 'Такого проекта не существует' });
        else
            res.json({ message: 'Проект удален', result: result });
    })
};

exports.getUserAllProject = function(req, res, next) {
    var data = getReqData(req);

    Project.find({ _parent: [data.id_user] }, function(err, projects) {
        if (err) return next(err);

        res.json(projects);
    })
};