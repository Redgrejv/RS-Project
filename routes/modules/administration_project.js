var HttpError = require('../../error').HttpError;
var Project = require('../../models/projects').Project;
// var mongoose    = require('mongoose');

function getReqData(req) {
    return data = {
        title: req.body.title,
        id_user: req.tokenObj.id
    };
}

exports.insertProject = function(req, res, next) {
    var data = getReqData(req);

    var new_project = new Project({
        title: data.title,
        createdBy: data.id_user,
        dateLastModification: Date.now()
    });

    new_project.save(function(err) {
        if (err) return next(err);

        res.json({ message: 'Проект успешно сохранен' });
    })
};

exports.patchProject = function(req, res, next) {
    var data = getReqData(req);

    var new_title = req.body.new_title;

    Project.update(
        { createdBy: data.id_user, title: data.title, _id: req.params.id }, 
        { title: new_title, dateLastModification: Date.now() }, 
        function(err) {
            if (err) return next(err);

            res.json({ message: 'Данные обновлены' });
        });
};

exports.deleteProject = function(req, res, next) {
    var data = getReqData(req);

    Project.remove({ users: [data.id_user], _id: req.params.id }, function(err, result) {
        if (err) return next(err);

        if (result.result.n == 0)
            res.status(204).json({ message: 'Такого проекта не существует' });
        else
            res.json({ message: 'Проект удален', result: result });
    })
};

exports.getUserAllProject = function(req, res, next) {
    var data = getReqData(req);

    Project.find({ users: data.id_user }, function(err, projects) {
        if (err) return next(err);

        res.json(projects);
    })
};