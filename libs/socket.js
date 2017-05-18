/**
 * Created by redgr on 15.05.2017.
 */



module.exports = function (server) {

    var io = require('socket.io').listen(server);


    io.sockets.on('connection', function (socket) {
        global.io = io;
        global.socket = socket;
    });

};