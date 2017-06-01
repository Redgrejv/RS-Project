var HttpError = require('../error').HttpError;
var Project = require('../models/projects').Project;
var async = require('async');

exports.insertProject = function(req, res, next) {
    var data = getReqData(req);

    if (!data.title) {
        return next(new HttpError(400, 'Поле заголовка не может быть пустым.'));
    }

    var new_project = new Project({
        title: data.title,
        createdBy: data.id_user,
        dateLastModification: Date.now()
    });

    new_project.save(function(err, project) {
        if (project) return next(err);

        res.json({ project: project });
    })
};


exports.patchProject = function(id, new_title) {
    var data;
    Project.update({ _id: id }, { title: new_title, dateLastModification: Date.now() },
        function(err) {
            if (err) return next(err);

            data = { status: 200 };
        });
};

exports.deleteProject = function(req, res, next) {
    var data = getReqData(req);

    Project.remove({ _id: req.params.id }, function(err, status) {
        if (err) return next(err);

        if (status.result.n == 0)
            res.status(204).json({ message: 'Такого проекта не существует' });
        else
            res.status(200).end();
    })
};

exports.getUserAllProject = function(req, res, next) {
    var data = getReqData(req);

    Project.find({ createdBy: data.id_user }, function(err, projects) {
        if (err) return next(err);

        res.json(projects);
    })
};