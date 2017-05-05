/**
 * Created by redgr on 12.04.2017.
 */
"use strict";

var crypto =        require('crypto');
var async =         require('async');
var HttpError   =   require('../error').HttpError;

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
};

schema.statics.checkUser = function (username, password, callback) {
    var User = this;

    if(!username || !password){
        return callback(new HttpError(403, "Неправильные данные. Поле \"login\" and \"password\" не должно быть пустым"));
    }

    async.waterfall([
        function (callback) {
            User.findOne({login: username}, callback);
        },
        function (user, callback) {
            if (user) {
                if (user.checkPassword(password)) {
                    callback(null, user);
                }else{
                    callback(new HttpError(403, "Пароль не верен"));
                }
            }else{
                callback(new HttpError(403, "Пользователь не найден"));
            }
        }
    ], callback);
}

exports.User = mongoose.model('User', schema);


