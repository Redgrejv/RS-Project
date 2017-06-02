/*function validate(form) {
        var reason = "";

        if (form.login.value == "" || /[^a-zA-z]/.sign_up(form.login.value))
            reason += "Ошибка имени ";
        if (form.password.value == "" || /[^0-9]/.sign_up(form.password.value))
            reason += "Ошибка пароля ";
        if (form.email.value == "" || /[^*@*.*]/.sign_up(form.password.value))
            reason += "ошибка почты ";
        if (reason == "")
            return true;  
        else {
            alert(reason);  
            return false;
        }
    }
*/

// var form = null;

// $(document).ready(function () {
//  var form = $(document.forms['sign_up']);

//     $('button', form).on('click', function (event) {
//         event.preventDefault();
//         function error(data) {

//             $('<div><span>'+data.responseJSON.message+'</span></span></div>')
//                 .addClass('new_user')
//                 .appendTo('body')
//                 .fadeOut(1200, function () {$(this).remove();});
//         }

//         if(check(form)){
//             $.ajax({
//                 url: 'http://localhost:3000/api/sign-up',
//                 method: 'POST',
//                 data: form.serialize(),
//                 statusCode: {
//                     200: function (data) {
//                         $('<div><span>Успешно</span></span></div>')
//                             .addClass('new_user')
//                             .appendTo('body')
//                             .fadeOut(1200, function () {$(this).remove(); window.location.href = '/'});
//                     },
//                     400: error,
//                     500: error
//                 }

//             });
//         }

//         return false;
//     });

//     $('#come_back').click(function () {
//         window.location.href = '/';
//     })

// });

// function check(form) {
//     form = form[0];
//     var first_name = form.first_name.value;
//     var last_name = form.last_name;
//     var email = form.email.value;
//     var password = form.password.value;
//     // var message = form.email.value;
//     var confirm_password = form.confirm_password.value;
//     var bad = "";

//     if (first_name.length < 3)
//        bad += "Имя слишком короткое" + "\n";
//     if (first_name.length > 32)
//        bad += "Имя слишком длинное" + "\n";
//    if (last_name.length < 3)
//        bad += "Фамилия слишком короткая" + "\n";
//     if (last_name.length > 32)
//        bad += "Фамилия слишком длинная" + "\n";
//     if (password.length < 3)
//         bad += "Пароль слишком короткий" + "\n";
//     if (password.length > 15)
//         bad += "Пароль слишком длинный" + "\n";
//    // if (email.length < 3)
//    //     bad += "Неверно введённая почта" + "\n";
//     if (bad != "") {
//         bad += "Неверно заполнена форма:" + "\n" + bad;
//         alert(bad);
//         return false;
//     }
//   return true;
// }


$(document).ready(function() {
    $('#exit').click(function() {
        localStorage.setItem('token', '');
        window.location.href = '/client/views/index.html';
    })
});