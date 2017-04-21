/**
 * Created by redgr on 10.04.2017.
 */

"use strict";

var mongoose =  require('mongoose'),
    log =       require('./log')(module),
    config =    require('../config/index');

mongoose.Promise = global.Promise;

mongoose.connect(config.get('db:uri'), config.get('db:options'));
var db = mongoose.connection;

db.on('error', function (err) {
    console.error('connection error: ' + err.message);
});

db.on('open', function callback() {
    console.log('Connected to DB: ' + db.name);
});

module.exports = mongoose;

