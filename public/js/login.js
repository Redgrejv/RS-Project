$(document).ready(function () {
    var form = $('.rf');
    var btn=form.find('.login');
    ButtonDisable();

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

    form.find('#email').on('input keyup',function(){
            var pattern=/^([a-zA-Z0-9_\.-]{2,20})+@[a-z0-9-]+\.([a-z],{2,4}\.)?[a-z]{2,4}$/i;
            if($(this).val() != '') {
            if(pattern.test($(this).val())){
                $(this).removeClass('empty');
                $(this).addClass('ok');
                $('.lmail').text('');
            }else{
            $('.lmail').text('Почта введена некоректно');
            $(this).removeClass('ok');
        }
}
else {
    $('.lmail').text('Введите почту');
     $(this).removeClass('ok');
}
ButtonDisable();
});

    form.find('#password').on('input keyup',function(){
            var regular=/^([a-zA-Z0-9]){2,20}$/;
            if($(this).val() != '') {
            if(regular.test($(this).val())){
                $(this).removeClass('empty');
                $(this).addClass('ok');
                $('.lpass').text('');
            }else{
            $('.lpass').text('Пароль введен некоректно');
            $(this).removeClass('ok');
        }
    }
    else{ 
        $('.lpass').text('Введите пароль');
        $(this).removeClass('ok');
    }
    ButtonDisable();
    });

function ButtonDisable(){
 sizeOk=$('.rf').find('.ok').length;
    if(sizeOk==2){
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


$('#sign_in').click(function(evet){
    event.preventDefault();
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
			 $('.error').text(data.responseJSON.message);		
		}

		})
});

$('#sign_up').click(function(event){
    event.preventDefault();
    window.location.href='sign_up.html';
});
})
//А-ЯёЁ регулярка кирилица