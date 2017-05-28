/**
 * Created by redgr on 05.04.2017.
 */

"use strict";
//require('child_process').exec('start mongod');

var express = require('express');
var expressSession = require('express-session');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var config = require('./config');
var log = require('./libs/log')(module);
var HttpError = require('./error').HttpError;
var MongoStore = require('connect-mongo')(expressSession);
var mongoose = require('./libs/mongoose');

var app = express();

app.configure(function() {
    app.set("view options", { layout: false });
    app.engine('html', require('ejs').renderFile);
    app.use('/public', express.static(__dirname + '/public'));
});

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.cookieParser());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Allow-Method', 'GET POST DELETE PATCH');
    next();
});
// app.use(express.session({
//     secret: process.env.SESSION_SECRET || 'express_secret_key_session',
//     resave: true,
//     saveUninitialized: true,
//     store: new MongoStore({mongooseConnection: mongoose.connection})
// }));

// var passport = require('./models/passport');
//
// app.use(passport.initialize());
// app.use(passport.session());


app.use(require('./middleware/sendHttpError'));
app.use(app.router);

require('./routes')(app);

app.use(function(err, req, res, next) {
    if (typeof err === 'number') {
        err = new HttpError(err);
    }

    if (err instanceof HttpError) {
        res.statusCode = err.status;
        res.send(err);
    } else {
        if (app.get('env') === 'development') {
            express.errorHandler()(err, req, res, next);
        } else {
            log.error(err);
            err = new HttpError(500);
            res.send(err);
        }
    }
});

// app.set(function(req, res, next) {
// res.setHeader('Access-Control-Allow-Origin', '*');
// res.setHeader('Access-Control-Allow-Headers', 'GET POST DELETE PATCH')
// });

var server = http.createServer(app);

server.listen(config.get('port'), function(req, res) {
    console.log('Express server listening on port ' + config.get('port'));
});

require('./libs/socket')(server);