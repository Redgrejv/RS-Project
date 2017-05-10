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

$(document).ready(function () {
    var form = $(document.forms['sign_up'])[0];

    $('.uppercase').on('click', function (event) {
        event.preventDefault();

        if(check(form)){
            $.ajax({
                url: '/api/register',
                method: 'POST',
                data: form.serialize()

            }).sucess(function () {
                // body...
            }).error(function (argument) {
                // body...
            });
        }else{

        }

        return false;
    });

    $(form.login).on('blur', function (event) {
        $.ajax({
            url: '/api/info/checkLogin',
            method: 'POST',
            data: font.login,
            statusCode: {
                500: function (data) {
                    $()
                },
                400: function (argument) {
                    // body
                }
            }
        })
    })

});


function check(form) {
  var login = form.login.value;
  var password = form.password.value;
  var message = form.email.value;
  var confirm_password = form.confirm_password.value;
  var bad = "";
  if (login.length < 3)
     bad += "Имя слишком короткое" + "\n";
  if (login.length > 32)
    bad += "Имя слишком длинное" + "\n";
  if (password.length < 6)
    bad += "Пароль слишком короткий" + "\n";
  if (password.length > 15)
    bad += "Пароль слишком длинный" + "\n";
  if (email.length < 3)
    bad += "Неверно введённая почта" + "\n";
    if (bad != "") {
    bad += "Неверно заполнена форма:" + "\n" + bad;
    alert(bad);
    return false;
  }
  return true;
}