var nmail = require('nodemailer');
var Promise = require('bluebird');
var User = require('../models/user').User;
var HttpError = require('../error').HttpError;

var email = require('emailjs');

var user = 'da.redgrave@gmail.com';

var emailServer = email.server.connect({
    user: user,
    password: "Zhurid1995",
    host: 'smtp.gmail.com',
    ssl: true
})

module.exports = {
    sendAddUserToProject
}

function sendAddUserToProject(projectID, userEmail) {
    return new Promise(function (resolve, reject) {
        User.findOne({ email: userEmail }, function (err, user) {
            if (err) return reject(new HttpError(404, "Email не найден"));

            var mail = {
                from: user,
                to: user.email,
                subject: 'Подтверждение на добавление в проект',
                text: 'Подтвердите свое добавление к проекту перейдя по ссылке.',
                attachment: [{ data: '<a href=\'http://localhost:3000/api/projects/' + projectID + '/users/' + user._id + '\'>Подтвердите ваше добавление в проект</a>' }]
            }

            emailServer.send(mail, function (err, info) {
                if (err) return reject(err);

                resolve('Message ' + info.messageId + ' sent: ' + info);
            })
        })
    })

}