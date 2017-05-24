$(document).ready(function () {
    var form = $('.rf');
    var btn=form.find('.login');
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
            }else{
            $('.lpass').text('Пароль введен некоректно');
        }
    }
    else{ 
        $('.lpass').text('Введите пароль');
    }
    });

setInterval(function(){
    checked();
    sizeOk=form.find('.ok').length;
    if(sizeOk>1){
        btn.attr('disabled','true');
        btn.removeClass('disable');
    }
    else{
        btn.attr('disabled','false');
        btn.addClass('disable');
    }
},500);


})
//А-ЯёЁ регулярка кирилица