var nodemailer = require('nodemailer');
var Promise = require('bluebird');
var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
var smtpPool = require('nodemailer-smtp-pool');

var config = require('../config');

var emailServer = nodemailer.createTransport(smtpPool({
    auth: {
        user: config.get('email:login'),   //email of sender
        pass: config.get('email:pass')    //password of sender
    },
    host: 'smtp.gmail.com',    //my email host
    ssl: true,
    port: 465,
    service: 'Gmail'
}));

module.exports = {
    sendAddUserToProject
}

/**
 * Добавление нового пользователя к проекту
 * @param {ObjectID} projectID - ID проекта 
 * @param {String} userEmail - Email получателя письма
 */
function sendAddUserToProject(projectID, userEmail) {
    return new Promise(function (resolve, reject) {
        User.findOne({ email: userEmail }, function (err, user) {
            if (err) return reject(new HttpError(404, "Email не найден"));

            var mail = {
                from: 'Администрация сервиса RS-Project ' + config.get('email:login'),
                to: userEmail,
                subject: 'Подтверждение на добавление в проект',
                html: '<h3>Подтвердите свое добавление к проекту перейдя по текущей <a href=\'http://localhost:3000/api/projects/' + projectID + '/users/' + user._id + '\'>ссылке</a>.</h3>'
            }

            emailServer.sendMail(mail, function (err, info) {
                if (err) return reject(err);

                resolve('Сообщение успешно отправлено.');
            })
        })
    })

}