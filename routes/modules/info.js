/**
 * Created by redgr on 25.04.2017.
 */

var pkginfo     = require('pkginfo')(module);
var Project     = require('../../models/projects').Project;
var User        = require('../../models/user').User;
var HttpError   = require('../../error').HttpError;
var ObjectID    = require('bson').ObjectID;

module.exports.getVersion = function (req, res, next) {
    res.json(module.exports.version);
};

module.exports.checkEmail = function (req, res, next) {
    User.findOne({email: req.body.email}, function (err, user) {
        if(user) {
            return res
                .status(400)
                .json({ message: 'Такой email уже существует.' });
        }

        res.status(404).json({ message: 'Email свободен' });
    })
};