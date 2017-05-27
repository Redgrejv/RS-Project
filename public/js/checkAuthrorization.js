var localhost = 'http:localhost:3000'
var pathAutorize = '/api/autorize';

$(document).ready(function() {
    if (!localStorage.getItem('token') || !checkToken(localStorage.getItem('token'))) {

        $('<div class="message"><span>Вы не авторизованы. Сейчас вы будете перенаправлены на страницу входа</span></div>')
            .appendTo($('body'));

        setTimeout(function() {
            window.location.href = 'login.html';
        }, 1500);
    }
});

function checkToken(token) {
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/api/info/checkToken",
        heders: { 'Authorization': token },
        success: function(response) {
            return true;
        }
    });
    return false;
}