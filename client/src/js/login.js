$(document).ready(function() {
        var form = $('.login-block__login-form');
        var btn = form.find('.login-form__button-login');
        ButtonDisable();

        form.submit(function(event) {
            event.preventDefault();
        });
        form.find('.field').addClass('empty');

        function checked() {
            form.find('.field').each(function() {
                if ($(this).val() != '') {
                    $(this).removeClass('empty');
                } else {
                    $(this).addClass('empty');
                }
            });
        }

        form.find('#login-form__email').blur(function() {
            var pattern = /^([a-zA-Z0-9_\.-]{2,20})+@[a-z0-9-]+\.([a-z],{2,4}\.)?[a-z]{2,4}$/i;
            if ($(this).val() != '') {
                if (pattern.test($(this).val())) {
                    $(this).removeClass('empty');
                    $(this).addClass('ok');
                    $('.login-form__login-email').text('');
                    ButtonDisable();
                } else {
                    $('.login-form__login-email').text('Почта введена некоректно');
                    $(this).removeClass('ok');
                }
            } else {
                $('.login-form__login-email').text('Введите почту');
                $(this).removeClass('ok');
            }
        });

        form.find('#login-form__password').blur(function() {
            var regular = /^([a-zA-Z0-9]){2,20}$/;
            if ($(this).val() != '') {
                if (regular.test($(this).val())) {
                    $(this).removeClass('empty');
                    $(this).addClass('ok');
                    $('.login-form__login-password').text('');
                    ButtonDisable();
                } else {
                    $('.login-form__login-password').text('Пароль введен некоректно');
                    $(this).removeClass('ok');
                }
            } else {
                $('.login-form__login-password').text('Введите пароль');
                $(this).removeClass('ok');
            }
        });

        function ButtonDisable() {
            sizeOk = $('.login-block__login-form').find('.ok').length;
            if (sizeOk == 2) {
                $('#login-form__button-login').prop('disabled', false);
                $('#login-form__button-login').removeClass('login-form__button-login_disable');
            } else {
                $('#login-form__button-login').prop('disabled', true);
                $('#login-form__button-login').addClass('login-form__button-login_disable');
            }
        }

        setInterval(function() {
            checked();
        }, 500);


        $('#login-form__button-login').click(function(evet) {
            event.preventDefault();
            $.ajax({
                url: 'http://localhost:3000/api/autorize',
                type: 'POST',
                data: {
                    email: $('#login-form__email').val(),
                    password: $('#login-form__password').val()
                },
                success: function(data) {
                    localStorage.setItem('token', data.token);
                    window.location.href = 'index.html';
                },
                error: function(data) {
                    $('.login-form__error').text(data.responseJSON.message);
                }

            })
        });

    })
    //А-ЯёЁ регулярка кирилица