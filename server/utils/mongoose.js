/**
 * Created by redgr on 10.04.2017.
 */

var mongoose = require('mongoose'),
    log = require('./log')(module),
    config = require('../config');

mongoose.connect(config.get('db:connection'));
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error: ' + err.message);
});

db.on('open', function callback() {
    log.info('Connected to DB');
});


var Article = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    modified: { type: Date, default: Date.now }
});

// validation
Article.path('title').validate(function (v) {
    return v.length > 5 && v.length < 70;
});

var ArticleModel = mongoose.model('Article', Article);

module.exports.ArticleModel = ArticleModel;