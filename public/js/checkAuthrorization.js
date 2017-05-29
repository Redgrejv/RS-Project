"use strict";

$(document).ready(function() {
    var token = localStorage.getItem('token');
    if (!token) {

        showMessage('Вы не авторизованы. Сейчас вас перенаправят на страницу входа');

        setTimeout(function() {
            window.location.href = 'login.html';
        }, 2000);
    }
});