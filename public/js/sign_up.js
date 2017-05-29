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

$(document).ready(function () {
    var form = $('.reg_form');
    var btn=form.find('.sign_in');
    form.submit(function (event) {
        event.preventDefault();
    });
    form.find('.field').addClass('empty');

    function checked(){
        form.find('.field').each(function(){
            if($(this).val()!=''){
                $(this).removeClass('empty');
                }
            else{
                $(this).addClass('empty');
            }
        });
    }

function EmptyFilds(){
    form.find('.empty').css({'border-bottom':'1px solid red'});

    setTimeout(function(){
        form.find('.empty').removeAttr('style');

    },500);
}

    form.find('#email').blur(function(){
            var pattern=/^([a-zA-Z0-9_\.-]{2,20})+@[a-z0-9-]+\.([a-z],{2,4}\.)?[a-z]{2,4}$/i;
            if($(this).val() != '') {
            if(pattern.test($(this).val())){
                $(this).removeClass('empty');
                $(this).addClass('ok');
                $('.lmail').text('');
                ButtonDisable();
            }else{
            $('.lmail').text('Почта введена некоректно');
        }
}
else {
    $('.lmail').text('Введите почту');
}
});

    form.find('#password').blur(function(){
            var regular=/^([a-zA-Z0-9]){2,20}$/;
            if($(this).val() != '') {
            if(regular.test($(this).val())){
                $(this).removeClass('empty');
                $(this).addClass('ok');
                $('.lpass').text('');
                ButtonDisable();
            }else{
            $('.lpass').text('Пароль введен некоректно');
        }
    }
    else{ 
        $('.lpass').text('Введите пароль');
    }
    });

function ButtonDisable(){
 sizeOk=$('.rf').find('.ok').length;
    if(sizeOk>1){
        $('#sign_in').prop('disabled',false);
        $('#sign_in').removeClass('disable');
    }
    else{
        $('#sign_in').prop('disabled',true);
        $('#sign_in').addClass('disable');
    }
}

setInterval(function(){
    checked();
},500);

form.submit(function(event){
    event.preventDefault();
});

$('#sign_in').click(function(evet){
    $.ajax({
        url: 'http://localhost:3000/api/autorize',
        type: 'POST',
        data: {email: $('#email').val(),
               password: $('#password').val()},
        success: function(data){
                localStorage.setItem('token', data.token);
                window.location.href='index.html';
        },
        error: function(data){
             $('.lpass').text(data.errorText);      
        }

        })
});
})
//А-ЯёЁ регулярка кирилица