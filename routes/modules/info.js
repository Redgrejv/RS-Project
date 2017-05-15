/**
 * Created by redgr on 25.04.2017.
 */

var pkginfo     = require('pkginfo')(module);
var User        = require('../../models/user').User;
var HttpError   = require('../../error').HttpError;

module.exports.getVersion = function (req, res, next) {
    res.json(module.exports.version);
    // });
};

// module.exports.checkLogin = function (req, res, next) {
//     User.findOne({login: req.body.login}, function (err, user) {
//         if(user) return res.status(500).json({message: 'Такой логин уже существует.', status: 500});
//
//         res.status(404).json({message: 'Логин свободен', status: 404});
//     })
// };

module.exports.checkEmail = function (req, res) {
    User.findOne({email: req.body.email}, function (err, user) {
        if(user) return res.status(400).json({message: 'Такой email уже существует.', status: 400});

        res.status(404).json({message: 'Email свободен', status: 404});
    })
};