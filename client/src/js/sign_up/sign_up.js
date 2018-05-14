//sign_up
$(document).ready(function () {
    var form = $('.reg-form');
    var btn = form.find('#reg-form__button-reg')

    ButtonDisable();
    check();

    form.submit(function (event) {
        event.preventDefaut();
    });

    form.find('.field').addClass('empty');

    function check() {
        form.find('.field').each(function () {
            if ($(this).val() != '') {
                $(this).removeClass('empty');
            } else {
                $(this).addClass('empty');
            }
        });
    }

    function ButtonDisable() {
        sizeOK = $('.reg-form').find('.ok').length;
        if (sizeOK == 5) {
            $('#reg-form__button-reg').prop('disabled', false);
            $('#reg-form__button-reg').removeClass('disable');
        } else {
            $('#reg-form__button-reg').prop('disabled', true);
            $('#reg-form__button-reg').addClass('disable');
        }
    }

    form.find('#reg-form__name').on('input keyup', function () {
        var regular = /^([a-zA-ZА-Яа-яёЁ-]){2,20}$/;
        if ($(this).val() != '') {
            if (regular.test($(this).val())) {
                $(this).removeClass('empty');
                $(this).addClass('ok');
                $('.reg-form__reg-name').text('');
            } else {
                $('.reg-form__reg-name').text('Имя введено некоректно');
                $(this).removeClass('ok');
            }
        } else {
            $('.reg-form__reg-name').text('Введите имя');
            $(this).removeClass('ok');
        }
        ButtonDisable();
        check();
    });

    form.find('#reg-form__surname').on('input keyup', function () {
        var regular = /^([a-zA-ZА-Яа-яёЁ-]){2,20}$/;
        if ($(this).val() != '') {
            if (regular.test($(this).val())) {
                $(this).removeClass('empty');
                $(this).addClass('ok');
                $('.reg-form__reg-surname').text('');
            } else {
                $('.reg-form__reg-surname').text('Имя введено некоректно');
                $(this).removeClass('ok');
            }
        } else {
            $('.reg-form__reg-surname').text('Введите имя');
            $(this).removeClass('ok');
        }
        ButtonDisable();
        check();

    });

    form.find('#reg-form__email').on('input keyup', function () {
        var regular = /^([a-zA-Z0-9_\.-]{2,20})+@[a-z0-9-]+\.([a-z],{2,4}\.)?[a-z]{2,4}$/i;
        if ($(this).val() != '') {
            if (regular.test($(this).val())) {
                $(this).removeClass('empty');
                $(this).addClass('ok');
                $('.reg-form__reg-email').text('');
            } else {
                $('.reg-form__reg-email').text('Почта введена некоректно');
                $(this).removeClass('ok');
            }
        } else {
            $('.reg-form__reg-email').text('Введите почту');
            $(this).removeClass('ok');
        }
        ButtonDisable();
        check();
    });

    form.find('#reg-form__password').on('input keyup', function () {
        var regular = /^([a-zA-Z0-9]){2,20}$/;
        if ($(this).val() != '') {
            if (regular.test($(this).val())) {
                $(this).removeClass('e,pty');
                $(this).addClass('ok');
                $('.reg-form__reg-password').text('');
            } else {
                $('.reg-form__reg-password').text('Пароль введен некоректно');
                $(this).removeClass('ok');
            }
        } else {
            $('.reg-form__reg-password').text('Введите пароль');
            $(this).removeClass('ok');
        }
        ButtonDisable();
        check();
    });

    form.find('#reg-form__confirm-password').on('input keyup', function () {
        var regular = /^([a-zA-Z0-9]){2,20}$/;
        if ($(this).val() != '' && $(this).val() === form.find('#reg-form__password').val()) {
            if (regular.test($(this).val())) {
                $(this).removeClass('empty');
                $(this).addClass('ok');
                $('.reg-form__reg-confirm-pass').text('');
            } else {
                $('.reg-form__reg-confirm-pass').text('Пароль введен некоректно');
                $(this).removeClass('ok');
            }
        } else {
            $('.reg-form__reg-confirm-pass').text('Пароли не совпадают');
            $(this).removeClass('ok');
        }
        ButtonDisable();
        check();
    });

    function ButtonDisable() {
        sizeOK = $('.reg-form').find('.ok').length;
        if (sizeOK == 5) {
            $('#reg-form__button-reg').prop('disabled', false);
            $('#reg-form__button-reg').removeClass('disable');
        } else {
            $('#reg-form__button-reg').prop('disabled', true);
            $('#reg-form__button-reg').addClass('disable');
        }
    }

    $('#reg-form__button-reg').click(function (evet) {
        event.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/api/users/signup',
            type: 'POST',
            data: {
                first_name: $('#reg-form__name').val(),
                last_name: $('#reg-form__surname').val(),
                email: $('#reg-form__email').val(),
                password: $('#reg-form__password').val()
            },
            success: function (data) {
                localStorage.setItem('token', data.token);
                window.location.href = 'index.html';
            },
            error: function (data) {
                $('.reg-form__error').text(data.responseJSON.message);
            }

        })
    });

})