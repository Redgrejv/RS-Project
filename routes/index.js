/**
 * Created by redgr on 15.04.2017.
 */

"use strict";

// var User        = require('../models/user').User;
// var HttpError   = require('../error').HttpError;
// var ObjectID    = require('mongodb').ObjectID;
// var path        = require('path');
// var HttpError   = require('../error').HttpError;
//
// module.exports = function (app) {
//
//     app.get('/login', function (req, res, next){
//         res.render('login');
//     });
//
//     app.get('/login/user', function (req, res, next) {
//         User.findOne({login: req.query['login']}, function (err, user) {
//             if (err) return next();
//             if (!user) {
//                 next(new HttpError(404, "User not Found"));
//             }
//             res.render('user', {
//                 user: user
//             });
//         });
//
//     });
//
//     app.get('/login/user/:id', function (req, res, next) {
//         var id;
//         try {
//             id = new ObjectID(req.params.id);
//         }catch(e) {
//             return next(404);
//         }
//
//         User.findById(id, function (err, user) {
//             if (err) return next(err);
//             if (!user) {
//                 next(new HttpError(404, "User not Found"));
//             }
//             res.render('user', {
//                 user: user
//             });
//         });
//     });
//
//     app.get('/version', function(req,res,next){
//
//         var fs = require('fs');
//         var file = JSON.parse(fs.readFileSync(__dirname.replace('routes', 'package.json'), 'utf8'));
//
//         res.send("Версия back-end: " + file['version']);
//     });
//
//
//     app.get('/register', function (req, res, next){
//         res.render('register');
//     });
//
//     app.post('/register/user', function (req, res, next) {
//
//         var data = req.body;
//         if(!data['login'] || !data['password']){
//             next(new HttpError(500, 'Invalid data. Plane "login" and "password" is not may empty'))
//         }
//         var new_user = new User({
//             login: data['login'],
//             password: data['password'],
//             first_name: data['first_name'],
//             last_name: data['last_name'],
//             about: data['about']
//         });
//
//
//         new_user.save(function (err) {
//             if(err) {
//                 console.log(err);
//                 next(new HttpError(500, 'Login ' + data['login'] + ' is busy'));
//             }else{
//                 console.log('complete');
//                 res.render('index');
//             }
//         });
//     });
// };

module.exports = function (app) {
    app.get('/', require('./frontpage').get);

    app.get('/login', require('./login').get);
    app.post('/login', require('./login').post);

    app.get('/register', require('./register').get);
    app.post('/register/user', require('./register').post);

    app.get('/within', function (req, res, next) {
        res.render('within');
    });
};