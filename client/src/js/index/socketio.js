
$(document).ready(function () {
    var socket = io.connect();

    socket.on('new user', function (data) {
        $('<span>data.message</span>')
        .addClass('new_user')
        .appendTo('body')
        .fadeOut(1200, function () {
            $(this).remove();
        });
    });
});