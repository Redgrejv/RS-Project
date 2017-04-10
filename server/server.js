/**
 * Created by redgr on 05.04.2017.
 */

var express  =  require('express');
var path     =  require('path');
var app = express();

app.use(express.bodyParser()); // парсер JSON
app.use(express.methodOverrid());
app.use(app.router);
app.use(express.static(path.join(__dirnsme, 'public')));

app.get('/api', function (req, res) {
    res.send('API is running');
})

app.listen(1333, function () {
    console.log('Express server listening');
})