$(document).ready(function(){
    var form = $('.reg_form');
    var btn  = form.find('#sign_up');
    ButtonDisable();

    form.submit(function(event){
        event.preventDefault();
    });

    form.find('.field').addClass('empty');

    function check(){
        form.find('.field').each(function(){
            if ($(this).val()!=''){
                $(this).removeClass('empty');
            }else{
                $(this).addClass('empty');
            }
        });
    }

    function EmptyFields(){
        form.find('.empty').css({'border-bottom':'1px solid red'});
        setTimeout(function(){
            form.fing('.empty').removeAttr('style');
        }, 500);
    }

form.find('#first_name').on('input keyup', function(){
    var regular=/^([a-zA-ZА-Яа-яёЁ-]){2,20}$/;
    if($(this).val()!=''){
        if(regular.test($(this).val())){
            $(this).removeClass('empty');
            $(this).addClass('ok');
            $('.fname').text('');
        }else{
            $('.fname').text('Имя введено некоректно');
            $(this).removeClass('ok');
        }
    }else{
        $('.fname').text('Введите имя');
        $(this).removeClass('ok');
    }
    ButtonDisable();
});

form.find('#last_name').on('input keyup', function(){
    var regular=/^([a-zA-ZА-Яа-яёЁ-]){2,20}$/;
    if($(this).val()!=''){
        if (regular.test($(this).val())){
            $(this).removeClass('empty');
            $(this).addClass('ok');
            $('.lname').text('');
            
        }else{
            $('.lname').text('Фамилия введена некоректно');
            $(this).removeClass('ok');
        }
    }else{
        $('.lname').text('Введите фамилию');
        $(this).removeClass('ok');
    }
    ButtonDisable();
});

form.find('#email').on('input keyup', function(){
    var regular=/^([a-zA-Z0-9_\.-]{2,20})+@[a-z0-9-]+\.([a-z],{2,4}\.)?[a-z]{2,4}$/i;
    if ($(this).val()!=''){
        if(regular.test($(this).val())){
            $(this).removeClass('empty');
            $(this).addClass('ok');
            $('.rmail').text('');
        }else{
            $('.rmail').text('Почта введена некоректно');
            $(this).removeClass('ok');
        }
    }else{
        $('.rmail').text('Введите почту');
        $(this).removeClass('ok');
    }
    ButtonDisable();
});

form.find('#password').on('input keyup', function(){
    var regular=/^([a-zA-Z0-9]){2,20}$/;
    if ($(this).val()!=''){
        if (regular.test($(this).val())){
            $(this).removeClass('e,pty');
            $(this).addClass('ok');
            $('.rpass').text('');
        }else{
            $('.rpass').text('Пароль введен некоректно');
            $(this).removeClass('ok');
        }
    }else{
        $('.rpass').text('Введите пароль');
        $(this).removeClass('ok');
    }
    ButtonDisable();
});

form.find('#confirm_password').on('input keyup', function(){
    var regular=/^([a-zA-Z0-9]){2,20}$/;
    if ($(this).val()!='' && $(this).val()===form.find('#password').val()){
        if(regular.test($(this).val())){
            $(this).removeClass('empty');
            $(this).addClass('ok');
            $('.rcpass').text('');
        }else{
            $('.rpass').text('Пароль введен некоректно');
            $(this).removeClass('ok');
        }
    }else{
        $('.rcpass').text('Пароли не совпадают');
        $(this).removeClass('ok');
    }
    ButtonDisable();
});

function ButtonDisable(){
    sizeOK=$('.reg_form').find('.ok').length;
    if (sizeOK>4){
        $('#sign_up').prop('disabled',false);
        $('#sign_up').removeClass('disable');
    }else{
        $('#sign_up').prop('disabled',true);
        $('#sign_up').addClass('disable');
    }
}

setInterval(function(){
    check();
},500);

$('#sign_up').click(function(evet){
     event.preventDefault();
    $.ajax({
        url: 'http://localhost:3000/api/sign-up',
        type: 'POST',
        data: {first_name: $('#first_name').val(),
               last_name: $('#last_name').val(),
               email: $('#email').val(),
               password: $('#password').val()},
        success: function(data){
                localStorage.setItem('token', data.token);
                window.location.href='index.html';
        },
        error: function(data){
             $('.error').text(data.responseJSON.message);      
        }

        })
});

})