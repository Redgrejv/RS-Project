/**
 * Created by redgr on 05.04.2017.
 */

"use strict";

var express = require('express');
var expressSession = require('express-session');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var config = require('./config');
var log = require('./libs/log')(module);
var HttpError = require('./error').HttpError;
var mongoose = require('./libs/mongoose');

var app = express();

var redis = require('redis');
var RedisStore = require('connect-redis')(expressSession);
var redisClient = redis.createClient();

redisClient.on('error', function (err) {
    console.log('Error: ' + err);
});

redisClient.on('connect', function () {
    console.log('Connect to redis on port 6379');
})

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Access-Control-Allow-Methods, DNT, X-Mx-ReqToken, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control');
    res.setHeader('Access-Control-Allow-Methods', ['GET', 'PATCH', 'POST', 'DELETE', 'OPTIONS', 'HEAD', 'PUT']);
    next();
});

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.cookieParser());
app.use(express.session({
    secret: config.get('key-session'),
    resave: true,
    saveUninitialized: false,
    store: new RedisStore({ client: redisClient, host: 'localhost', port: 6379, ttl: 1800 })
}));



app.use(require('./error/sendHttpError'));
app.use(app.router);

require('./routes')(app, redisClient);

app.use(function (err, req, res, next) {
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

var server = http.createServer(app);

server.listen(config.get('port'), function (req, res) {
    console.log('Express server listening on port ' + config.get('port'));
});

require('./libs/socket')(server);

app.post('/temp', function (req, res, next) {

    res.json(req.body);
})