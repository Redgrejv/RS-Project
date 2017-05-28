$(document).ready(function() {
        var form = $('.rf');
        var btn = $('#sign_in');

        buttonDisable();

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

        function EmptyFilds() {
            form.find('.empty').css({ 'border-bottom': '1px solid red' });

            setTimeout(function() {
                form.find('.empty').removeAttr('style');

            }, 100);
        }

        $('#email').keyup(function() {
            var pattern = /^([a-zA-Z0-9_\.-]{2,20})+@[a-z0-9-]+\.([a-z],{2,4}\.)?[a-z]{2,4}$/i;
            if ($(this).val() != '') {
                if (pattern.test($(this).val())) {
                    $(this).removeClass('empty');
                    $(this).addClass('ok');
                    $('.lmail').text('');
                } else {
                    $(this).addClass('empty');
                    $(this).removeClass('ok');
                    $('.lmail').text('Почта введена некоректно');
                }
            } else {
                $(this).addClass('empty');
                $(this).removeClass('ok');
                $('.lmail').text('Введите почту');
            }

            buttonDisable();
        });

        $('#password').keyup(function() {
            var regular = /^([a-zA-Z0-9]){2,20}$/;
            if ($(this).val() != '') {
                if (regular.test($(this).val())) {
                    $(this).removeClass('empty');
                    $(this).addClass('ok');
                    $('.lpass').text('');
                } else {
                    $(this).addClass('empty');
                    $(this).removeClass('ok');
                    $('.lpass').text('Пароль введен некоректно');
                }
            } else {
                $(this).addClass('empty');
                $(this).removeClass('ok');
                $('.lpass').text('Введите пароль');
            }

            buttonDisable();
        });

        setInterval(function() {
            checked();

        }, 100);

        form.submit(function(event) {
            event.preventDefault();
        });

        $('#sign_in').click(function(evet) {
            event.preventDefault();

            $.ajax({
                url: 'http://localhost:3000/api/autorize',
                type: 'POST',
                data: {
                    email: $('#email').val(),
                    password: $('#password').val()
                },
                success: function(data) {
                    localStorage.setItem('token', data.token);
                    windows.location.href = 'index.html';
                },
                error: function(data) {
                    $('.lpass').text('Oshibka');
                }

            })
        });
    })
    //А-ЯёЁ регулярка кирилица

function buttonDisable() {
    sizeOk = $('.rf').find('.ok').length;
    if (sizeOk > 1) {
        $('#sign_in').prop('disabled', false);
        $('#sign_in').removeClass('disable');
    } else {
        $('#sign_in').prop('disabled', true);
        $('#sign_in').addClass('disable');
    }
}