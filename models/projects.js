/**
 * Created by redgr on 23.05.2017.
 */


var HttpError   =   require('../error').HttpError;

var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    _parent: [{
    	type: ObjectId,
    	unique: true,
        require: true,
    	ref: 'User'
    }]
});

exports.Project = mongoose.model('Project', projectSchema);