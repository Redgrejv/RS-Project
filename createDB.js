/**
 * Created by redgr on 16.04.2017.
 */

var mongoose = require('./libs/mongoose');
var User = require('models/user');

var db = mongoose.connection.db;
db.dropDatabase(function (err) {
    if(err) throw err;
    console.log('OK');
});