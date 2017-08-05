"use strict";

var express = require('express');
var session = require('express-session');
var http = require('http');
var path = require('path');
var config = require('./config');
var HttpError = require('./error').HttpError;
var JWTRedisSession = require('jwt-redis-session');

var redis = require('redis');
var rs = require('connect-redis')(session);

var app = express();

var client = redis.createClient({
    port: config.get("redis:port"),
    host: config.get("redis:host")
});


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods, Cache-Control', 'X-Requested-With');
    res.setHeader('Access-Control-Allow-Methods', /*['GET', 'PATCH', 'POST', 'DELETE', 'PUT']*/ 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Credentials', true);

    next();
});

app.use(express.cookieParser('/'));

app.use(express.session({
    client: client,
    secret: config.get('session:key'),
    // keyspace: config.get('session:keyspace'),
    ttl: 1800,
    // cookie: config.get('session:cookie')
    // requestKey: "jwtSession",
    // requestArg: "jwtToken"
}));
app.use(express.bodyParser());

app.use(require('./error/sendHttpError'));
app.use(app.router);

require('./routes')(app);

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

server.listen(config.get('server:port'), config.get('server:host'), function (req, res) {
    console.log('Express server listening on host ' + config.get('server:host') + ' port ' + config.get('server:port'));
});

require('./libs/socket')(server);






app.get('/temp', function (req, res, next) {
    res.json(req.body);
})



app.get('/', function (req, res) {
    if (req.session.page_views) {
        req.session.page_views++;
        res.send("You visited this page " + req.session.page_views + " times");
    } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
    }
    console.log(req.sessionID + '\n' + req.session.cookie);
});