/**
 * Created by redgr on 05.04.2017.
 */

"use strict";
//require('child_process').exec('start mongod');

var express =   require('express');
var http =      require('http');
var path =      require('path');
var config =    require('./config');
var log =       require('./libs/log')(module);
var mongoose =  require('./libs/mongoose');
var HttpError = require('./error').HttpError;

var app =       express();

app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/template');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.methodOverride());

var MongoStore = require('connect-mongo')(express);
app.use(express.session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));


app.use(require('./middleware/sendHttpError'));
app.use(require('./middleware/loadUser'));

app.use(app.router);
require('./routes')(app);

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
