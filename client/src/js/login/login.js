$(document).ready(function() {
        var form = $('.login-form');
        var btn = form.find('.login-form__button-login');
        ButtonDisable();
        checked();

        form.submit(function(event) {
            event.preventDefault();
        });
        form.find('.field').addClass('login-form_empty');


        function ButtonDisable() {
            sizeOk = $('.login-form').find('.ok').length;
            if (sizeOk == 2) {
                $('#login-form__button-login').prop('disabled', false);
                $('#login-form__button-login').removeClass('disable');
            } else {
                $('#login-form__button-login').prop('disabled', true);
                $('#login-form__button-login').addClass('disable');
            }
        }

          function checked() {
            form.find('.field').each(function() {
                if ($(this).val() != '') {
                    $(this).removeClass('login-form_empty');
                } else {
                    $(this).addClass('login-form_empty');
                }
            });
        }

        form.find('#login-form__email').on('blur',function() {
            var pattern = /^([a-zA-Z0-9_\.-]{2,20})+@[a-z0-9-]+\.([a-z],{2,4}\.)?[a-z]{2,4}$/i;
            if ($(this).val() != '') {
                if (pattern.test($(this).val())) {
                    $(this).removeClass('login-form_empty');
                    $(this).addClass('ok');
                    $('.login-form__login-email').text('');
                } else {
                    $('.login-form__login-email').text('Почта введена некоректно');
                    $(this).removeClass('ok');
                }
            } else {
                $('.login-form__login-email').text('Введите почту');
                $(this).removeClass('ok');
            }
                    ButtonDisable();
                    checked();
        });

        form.find('#login-form__password').on('blur',function() {
            var regular = /^([a-zA-Z0-9]){2,20}$/;
            if ($(this).val() != '') {
                if (regular.test($(this).val())) {
                    $(this).removeClass('login-form_empty');
                    $(this).addClass('ok');
                    $('.login-form__login-password').text('');
                } else {
                    $('.login-form__login-password').text('Пароль введен некоректно');
                    $(this).removeClass('ok');
                }
            } else {
                $('.login-form__login-password').text('Введите пароль');
                $(this).removeClass('ok');
            }
                    ButtonDisable();
                    checked();
        });


        $('#login-form__button-login').click(function(evet) {
            event.preventDefault();
            $.ajax({
                url: 'http://localhost:3000/api/users/login',
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