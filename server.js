"use strict";

var express = require('express');
var session = require('express-session');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var config = require('./config');
var HttpError = require('./error').HttpError;


var redis = require('redis');
var RedisStore = require('connect-redis')(session);
var client = redis.createClient();
var app = express();

client.on('error', function (err) {
    console.log('Error: ' + err);
});

client.on('connect', function () {
    console.log('Connect to redis on port 6379');
})

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.cookieParser());

app.use(session({
    secret: config.get('key-session'),
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ client: client, host: 'localhost', port: 6379, ttl: 1800 })
}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3333');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Access-Control-Allow-Methods, DNT, X-Mx-ReqToken, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control');
    res.setHeader('Access-Control-Allow-Methods', ['GET', 'PATCH', 'POST', 'DELETE', 'OPTIONS', 'HEAD', 'PUT']);
    next();
});

app.use(require('./error/sendHttpError'));
app.use(app.router);

require('./routes')(app, client);

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