
// var HttpError = require('../error').HttpError;

// var client = require('redis').createClient();
// var Promise = require('bluebird');
// var User = require('../models/user').User;
// var config = require('../config');
// var redis = require('redis');
// var session = require('redis-sessions');

// var client = redis.createClient({
//     port: config.get("redis:port"),
//     host: config.get("redis:host")
// });


// client.on('error', function (err) {
//     console.error('Error: ' + err);
// });

// client.on('connect', function () {
//     console.log('Connect to redis on port ' + config.get("redis:port"));
// })

// var rs = new session({
//     port: config.get("redis:port"),
//     host: config.get("redis:host"),
//     client: client
// });

// module.exports = {
//     create,
//     update,
//     kill,
//     check
// }

// function create(userID, token) {
//     return new Promise(function (resolve, reject) {
//         rs.create({
//             app: config.get('redis:appName'),
//             id: userID.toString(),
//             token: token,
//             ttl: 1800,
//             ip: '127.0.0.1',
//             d: {
//                 date: new Date(Date.now()).toLocaleDateString()
//             }
//         }, function (err, resp) {
//             if (err) return reject(err);

//             console.log(resp);
//             get(userID);
//             resolve(resp);
//         })
//     })
// }

// function get(userID) {
//     rs.soid({
//         app: config.get('redis:appName'),
//         id: userID
//     }, function (err, resp) {
//         console.log(resp || err);
//     })
// }

// function update(params) {

// }

// function check(params) {

// }

// function kill(params) {

// }

// // module.exports = {
// //     checkSession,
// //     updateSession
// // }

// // function checkSession(token, session, userID) {
// //     return new Promise(function (resolve, reject) {
// //         if (!session) {
// //             userActiveTime(token)
// //                 .then(function (data) {
// //                     var date = new Date(+data);
// //                     User.findByIdAndUpdate(userID, { lastActiveTime: date }, function (err, status) {
// //                         if (err) return next(err);
// //                     })
// //                     resolve({ userLastActive: date.toLocaleDateString() });
// //                 })
// //                 .catch(function (err) {
// //                     reject(err);
// //                 })
// //             reject(new HttpError(401, 'Сессия не активна'));
// //         }

// //         session.lastActiveTime = Date.now();
// //         updateSession(token, session)
// //             .then(function (data) {

// //             })
// //             .catch(function (err) {
// //                 reject(err);
// //             })
// //     })
// // }

// // /**
// //  * Получение данных сессии из редиса по токену
// //  * @param {ObjectId} токен пользователя
// //  */
// // function userActiveTime(token) {
// //     return new Promise(function (resolve, reject) {
// //         redisClient.get(token.toString(), function (err, data) {
// //             if (err) reject(err);
// //             resolve(data);
// //         })
// //     });
// // }

// // /**
// //  * Обновление данных сессии в редис
// //  * @param {ObjectId} токен пользователя 
// //  * @param {Session} сессия пользователя 
// //  */
// // function updateSession(token, session) {
// //     return new Promise(function (resolve, reject) {
// //         redisClient.set(token.toString(), session.lastActiveTime, function (err, data) {
// //             if (err) return reject(err);
// //             resolve(data);
// //         });
// //     })
// // }

