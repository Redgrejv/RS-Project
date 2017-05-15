
$(document).ready(function () {
    var socket = io.connect();

    socket.on('new user', function (data) {
        eval(data);
    })
});