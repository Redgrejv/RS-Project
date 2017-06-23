$(document).ready(function() {
	//проверяем авторизирован ли пользовате
	var token = localStorage.getItem('token');
    if (!token) {
    	setTimeout(function() {
            window.location.href = '/client/views/login.html';
        }, 500);
    }

	//show-hide-menu
	$('.menu_hide').click(function(){
		$('.menu').css('width','54px');
		$(this).css('display','none');
		$('.menu_show').css('display','inline-block');
		$(".menu__header-text").css('display','none');
		$('.menu__project-name').css('display','none');
		$('.icon-project').css('margin-left','0');
		$('.menu__project').css('justify-content','center');
	})

	$('.menu_show').click(function(){
		$('.menu').attr('style','');
		$(this).css('display','none');
		$('.menu_hide').css('display','inline-block');
		$(".menu__header-text").attr('style','');
		$('.menu__project-name').attr('style','');
		$('.icon-project').attr('style','');
		$('.menu__project').attr('style','');
	})

	//показ модального окна
	$('.menu__add-project').click(function(){
		event.preventDefault();
		$('#overlay').fadeIn(400, function(){
				$('.modal-window').css({'display':'block','opacity': '1', 'top':'35%'});
		});
	});

	//закрытие модального окна
	$('#overlay, #modal-window__close').click(function(){
			$('#overlay').fadeOut(400);
			$('.modal-window').attr('style','');
			$('#add-project-form__name').val('');
		});

	$('.menu').on('click','.menu__project', function(){
		var project_name=$(this).find('.menu__project-name').text();
		//var id=$(this).attr('id');
		//localStorage.setItem('project.id',id)
		$('.content__project-name').text(project_name);

	});

		
	//выход
	$('.icon-exit').on('click', function(){ 
		localStorage.setItem('token', '');
        window.location.href = '/client/views/login.html';
	});
	//список
	$('#options-overlay').click(function(){
		$('#options-overlay').fadeOut(400);
		$('.project-options').attr('style','');
	})
	$('.icon-plus-circle').on('click',function(){
		$('#options-overlay').fadeIn(400, function(){
				$('.project-options').css('display','block');

		});
	})
	})