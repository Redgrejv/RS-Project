"use strict";

var crypto = require('crypto');
var async = require('async');
var HttpError = require('../error').HttpError;

var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true,
        sparse: true
    },
    hashedPassword: {
        type: String,
        required: true

    },
    salt: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    about: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now()
    },
    lastActiveTime: {
        type: Date,
        default: Date.now(),
        require: true
    }
}, { versionKey: false });

userSchema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

userSchema.virtual('password')
    .set(function (password) {
        this.__plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () { return this.__plainPassword; });

userSchema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

// userSchema.static.prototype.updateLastVisit = function () {
//     User.findByIdAndUpdate(
//         userID,
//         { lastActiveTime: Date.now() },
//         { new: true },
//         function (err, model) {
//             console.log(err || model);
//         }
//     );
// }

exports.User = mongoose.model('User', userSchema);
