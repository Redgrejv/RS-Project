/**
 * Created by redgr on 05.04.2017.
 */

var express =   require('express');
var http =      require('http');
var path =      require('path');
var config =    require('./config');
var log =       require('./utils/log')(module);
var Article =   require('./utils/mongoose').ArticleModel;

var app =       express();


app.use(express.static(path.join(__dirname, "public")))
    .listen(config.get('port'), function () {
    console.log('Express server listening on port ' + config.get('port'));
});

app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});



