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

// function checkToken(token) {
//     if (!token) return false;

//     $.ajax({
//         type: "POST",
//         url: "http://localhost:3000/api/info/checkToken",
//         headers: {
//             'Authorization': token,
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         success: function(response) {
//             console.log(response.message);
//             return response.status;
//         },
//         error: function(response) {
//             return response.status;
//         }
//     }).fail(function(jqXHR) {
//         console.log(jqXHR.statusText);
//     });
// }