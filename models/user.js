/**
 * Created by redgr on 12.04.2017.
 */
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
        default: Date.now
    }
});

userSchema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

userSchema.virtual('password')
    .set(function(password) {
        this.__plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() {
        return this.__plainPassword;
    });

userSchema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

userSchema.statics.checkUser = function(email, password, callback) {
    var User = this;

    if (!email || !password) {
        return callback(new HttpError(400, "Заполните все поля."));
    }

    async.waterfall([
        function(callback) {
            User.findOne({
                email: email
            }, callback);
        },
        function(user, callback) {
            if (user) {
                if (user.checkPassword(password)) {
                    callback(null, user);
                } else {
                    callback(new HttpError(400, "Пароль не верен"));
                }
            } else {
                callback(new HttpError(404, "Пользователь не найден"));
            }
        }
    ], callback);
};

exports.User = mongoose.model('User', userSchema);
