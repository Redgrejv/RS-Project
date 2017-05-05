/**
 * Created by redgr on 05.04.2017.
 */

"use strict";
//require('child_process').exec('start mongod');

var express =           require('express');
var expressSession =    require('express-session');
var passport =          require('passport');
var passportJWT =       require('passport-jwt');
var jwt =               require('jsonwebtoken');
var http =              require('http');
var path =              require('path');
var bodyParser =        require('body-parser');
var cookieParser =      require('cookie-parser');
var config =            require('./config');
var log =               require('./libs/log')(module);
var HttpError =         require('./error').HttpError;

var User = require('./models/user').User;



var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt  = require('passport-jwt').ExtractJwt;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function (jwtPayload, next) {
    User.find({id: jwtPayload.id}, function (err, user) {
        if(err)
            return next(err, false);
        if(user) {
            next(null, user)
        }
        else {
            next(null, false);
        }
    })
})

var app = express();

app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/template');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.cookieParser());
app.use(expressSession({
    secret: process.env.SESSION_SECRET || 'express_secret_key_session',
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(require('./middleware/sendHttpError'));

app.use(app.router);
passport.use(strategy);

require('./routes')(app, passport);




http.createServer(app)
    .listen(config.get('port'), function () {
        console.log('Express server listening on port ' + config.get('port'));
});
