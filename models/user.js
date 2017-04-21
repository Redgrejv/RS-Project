/**
 * Created by redgr on 12.04.2017.
 */
"use strict";

var crypto = require('crypto');

var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new mongoose.Schema({
    login: {
        type: String,
        unique: true,
        required: true
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
        type: String
    },
    last_name: {
        type: String
    },
    about: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function (password) {
        this.__plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () { return this.__plainPassword; });

schema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
}

exports.User = mongoose.model('User', schema);