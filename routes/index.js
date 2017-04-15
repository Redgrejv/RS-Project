/**
 * Created by redgr on 15.04.2017.
 */

var User        = require('../models/user').User;
var HttpError   = require('../error').HttpError;
var ObjectID    = require('mongodb').ObjectID;
var path        = require('path');

module.exports = function (app) {

    app.get("/", function (req, res, next) {
        res.render("index");
    });

    app.get("/user", function (req, res, next) {
        User.findOne({login: req.query['login']}, function (err, user) {
            if (err) return next();
            if (!user) {
                next(new HttpError(404, "User not Found"));
            }
            res.render('user', {
                user: user
            });
        });

    });

    app.get('/user/:id', function (req, res, next) {
        try {
            var id = new ObjectID(req.params.id);
        }catch(e) {
            return next(404);
        }

        User.findById(id, function (err, user) {
            if (err) return next(err);
            if (!user) {
                next(new HttpError(404, "User not Found"));
            }
            res.render('user', {
                user: user
            });
        });
    });

    app.get('/version', function(req,res,next){

        var fs = require('fs');
        var file = JSON.parse(fs.readFileSync(__dirname.replace('routes', 'package.json'), 'utf8'));

        res.send("Версия back-end: " + file['version']);
    })
};