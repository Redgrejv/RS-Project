/**
 * Created by redgr on 23.05.2017.
 */


var HttpError = require('../error').HttpError;

var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    createdBy: {
        type: ObjectId,
        require: true,
        index: true,
        ref: 'User'
    },
    users: [{
        type: ObjectId,
        ref: 'User'
    }],
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    dateLastModification: {
        type: Date,
        default: Date.now(),
        required: true
    },
    description: {
        type: String
    }
});

exports.Project = mongoose.model('Project', projectSchema);