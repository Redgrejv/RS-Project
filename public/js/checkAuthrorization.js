var localhost = 'http:localhost:3000'
var pathAutorize = '/api/autorize';

$(document).ready(function() {
    var token = localStorage.getItem('token');
    if (!token) {

        $('<div class="message"><span>Вы не авторизованы. Сейчас вы будете перенаправлены на страницу входа</span></div>')
            .appendTo($('body'));

        setTimeout(function() {
            window.location.href = 'login.html';
        }, 1500);
    }
});