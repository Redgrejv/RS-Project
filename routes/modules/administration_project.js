var HttpError = require('../../error').HttpError;
var Project = require('../../models/projects').Project;
// var mongoose    = require('mongoose');

function getReqData(req) {
    return data = {
        title: req.body.title,
        id_user: req.tokenObj.id
    };
}

<<<<<<< HEAD
exports.createProject = function(req, res, next) {
=======
exports.insertProject = function(req, res, next) {
>>>>>>> refactor.document
    var data = getReqData(req);

    if (!data.title) {
        return next(new HttpError(400, 'Укажите название проекта'));
    }

    var new_project = new Project({
        title: data.title,
        createdBy: data.id_user,
        dateLastModification: Date.now()
    });

<<<<<<< HEAD
    console.log(new_project);
    new_project.save(function(err) {
        if (err) return next(err);

        res.json({ message: 'Проект успешно сохранен' });
    })
};

exports.updateProject = function(req, res, next) {
=======
    new_project.save(function(err, project) {
        if (err) return next(err);

        res.json({ message: 'Проект успешно сохранен', project: project });
    })
};

exports.patchProject = function(req, res, next) {
>>>>>>> refactor.document
    var data = getReqData(req);

    var new_title = req.body.new_title;

<<<<<<< HEAD
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
=======
    Project.update({ createdBy: data.id_user, _id: req.params.id }, { title: new_title, dateLastModification: Date.now() },
        function(err) {
            if (err) return next(err);

            res.json({ message: 'Данные обновлены' });
        });
};

exports.deleteProject = function(req, res, next) {
    var data = getReqData(req);

    Project.remove({ createdBy: data.id_user, _id: req.params.id }, function(err, status) {
        if (err) return next(err);

        if (status.result.n == 0)
            res.status(204).json({ message: 'Такого проекта не существует' });
        else
            res.json({ message: 'Проект удален', result: status });
>>>>>>> refactor.document
    })
};

exports.getUserAllProject = function(req, res, next) {
    var data = getReqData(req);

<<<<<<< HEAD
    Project.find({ _parent: [data.id_user] }, function(err, projects) {
=======
    Project.find({ createdBy: data.id_user }, function(err, projects) {
>>>>>>> refactor.document
        if (err) return next(err);

        res.json(projects);
    })
};