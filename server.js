/**
 * Created by redgr on 05.04.2017.
 */

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
app.use(require('./middleware/sendHttpError'));
app.use(app.router);
app.use(express.session);

//app.use(express.methodOverride());
//app.use(express.session());

require('./routes')(app);

app.use(function(err, req, res, next){
    if(typeof  err === 'number'){
        err = new HttpError(err);
    }

    if(err instanceof HttpError){
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
        log.info('Express server listening on port ' + config.get('port'));
})
