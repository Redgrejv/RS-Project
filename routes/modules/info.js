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
//
// function newUser(req, res, next) {
//     var id = new ObjectID();
//
//     var new_user = new User({
//         _id: id,
//         email: '12341234',
//         password: '1234',
//         first_name: 'asdfgsdfg',
//         last_name: 'asdfgasd'
//     });
//
//     var project = new Project({
//         _parent: new_user._id,
//         title: 'This title'
//     });
//
//     project.save(function (err) {
//         if(err) return next(err);
//     });
//
//     new_user.save(function (err) {
//         if(err) return next(err);
//
//         Project
//             .findOne({title: 'This title'})
//             .populate('_creator')
//             .exec(function (err, user) {
//                 if (err) return next(err);
//                 console.log('The creator is %s', user);
//             });
//
//         User
//             .findOne({email: '12341234'})
//             .populate('projects')
//             .exec(function (err, project) {
//                 if (err) return next(err);
//                 console.log('The projects is %s', project);
//             });
//
//     });
//
//
// }