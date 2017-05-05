/**
 * Created by redgr on 05.04.2017.
 */

"use strict";
//require('child_process').exec('start mongod');

var express =           require('express');
var expressSession =    require('express-session');
var passport =          require('passport');
var passportLocal =     require('passport-local');
var http =              require('http');
var path =              require('path');
var bodyParser =        require('body-parser');
var cookieParser =      require('cookie-parser');
var config =            require('./config');
var log =               require('./libs/log')(module);
var HttpError =         require('./error').HttpError;

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
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());



app.use(require('./middleware/sendHttpError'));

app.use(app.router);
require('./routes')(app);
require('./models/passport')(passport);

app.use(function(err, req, res, next){
    if(typeof  err === 'number'){
        err = new HttpError(err);
    }

    if(err instanceof HttpError){
        res.statusCode = err.status;
        res.render('error', {
            error: err
        });
    }else{
        if(app.get('env') === 'development') {
            express.errorHandler()(err, req, res, next);
        }else{
            log.error(err);
            err = new HttpError(500);
            res.send(err);
        }
    }
});



http.createServer(app)
    .listen(config.get('port'), function () {
        console.log('Express server listening on port ' + config.get('port'));
});
