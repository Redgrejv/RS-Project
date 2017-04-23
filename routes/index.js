/**
 * Created by redgr on 15.04.2017.
 */

"use strict";

var User        = require('../models/user').User;
var HttpError   = require('../error').HttpError;
var mongoose    = require('../libs/mongoose');
var path        = require('path');
var async       = require('async');


module.exports = function (app) {

    app.get('/', function (req, res, next) {
        res.render('frontpage');
    })

    app.get('/login', function (req, res, next){
        res.render('login');
    });

    app.post('/login', function (req, res, next) {
        var username = req.body.login;
        var password = req.body.password;

        User.autorize(username, password, function (err, user) {
            if(err) return next(err);
            req.session.user = user._id;
            res.redirect('/within');
        })

    });

    app.get('/login/:id', function (req, res, next) {
        var id;
        try {
            id = new ObjectID(req.params.id);
        }catch(e) {
            return next(404);
        }

        User.findById(id, function (err, user) {
            if (err) return next(err);
            if (!user) {
                return next(new HttpError(404, "User not Found"));
            }
            res.render('user', {
                user: user
            });
        });
    });

    app.get('/register', function (req, res, next){
        res.render('register');
    });

    app.post('/register/user', function (req, res, next) {

        var data = req.body;
        if(!data['login'] || !data['password']){
            next(new HttpError(403, 'Invalid data. Plane "login" and "password" is not may empty'))
            return;
        }

        var new_user = new User({
            login: data['login'],
            password: data['password'],
            first_name: data['first_name'],
            last_name: data['last_name'],
            about: data['about']
        });


        new_user.save(function (err) {
            if(err) {
                console.log(err);
                return next(new HttpError(500, 'Login ' + data['login'] + ' is busy'));
            }else{
                console.log('complete');
            }
        });
    });

    app.get('/within', function(req, res, next){
        res.render('within');
    });

    app.get('/within/info/version', function (req, res, next) {
        var fs = require('fs');
        var data = fs.readFileSync(__dirname.replace('routes', 'package.json', 'utf-8'));
        res.send(JSON.parse(data).version);
    });

    app.get('/within/info/session', function(req, res, next){
        req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
        res.send(req.session);
    });

    app.post('/logout', function (req, res, next) {
        req.session.destroy();
        res.redirect('/');
    })

};
