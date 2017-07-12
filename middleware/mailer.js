var nmail = require('nodemailer');
var Promise = require('bluebird');
var User = require('../models/user').User;
var HttpError = require('../error').HttpError;

var transporter = nmail.createTransport({
    host: 'smtp.example.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'redgrejv10@gmail.com',
        pass: 'Redgrejv1995'
    }
});


module.exports = {
    sendAddUserToProject
}

function sendAddUserToProject(projectID, userEmail) {
    return new Promise(function (resolve, reject) {
        User.find({ email: userEmail }, function (err, user) {
            if (err) return reject(new HttpError(404, "Email не найден"));

            var mailOptions = {
                from: 'redgrejv10@gmail.com',
                to: user.email,
                html: '<a href=\'http://localhost:3000/api/projects/' + projectID + '/users/' + user._id + '\'>Подтвердите ваше добавление в проект</a>'
            }

            transporter.sendMail(mailOptions, function (err, info) {
                if (error) return reject(error);

                resolve('Message %s sent: %s', info.messageId, info.response);
            })
        })
    })

}