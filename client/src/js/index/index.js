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
		$('.menu__project-img').css('margin-left','0');
		$('.menu__project').css('justify-content','center');
	})

	$('.menu_show').click(function(){
		$('.menu').attr('style','');
		$(this).css('display','none');
		$('.menu_hide').css('display','inline-block');
		$(".menu__header-text").attr('style','');
		$('.menu__project-name').attr('style','');
		$('.menu__project-img').attr('style','');
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
		});


	$('.menu__project').on('click',function(){
		var project_name=$(this).find('.menu__project-name').text();
		$('.content__project-name').text(project_name);

	});

	//кнопка добавления проекта
	$('#add-project-form__button').click(function(event) {
            event.preventDefault();
            $.ajax({
            	method: "POST",
            	headers: {'Authorization': localStorage.getItem('token')},
            	url: "http://localhost:3000/api/projects/"+localStorage.getItem('user').id+'/user',
            	data:{title: $('#add-project-form__name').val()},
            	success: function(response){
            		//console.log(response);
            		$('.menu').append('<div class="menu__project" '+response.project._id+'><div class="menu__project-img"></div><div class="menu__project-name">'+response.project.title+'</div></div>');
					$('#overlay').fadeOut(400);
					$('.modal-window').attr('style','');
            	},
            	error:  function(response){
            		//console.log(response);
            	}
            });
		});
		
	//выход
	$('#exit').on('click', function(){ 
		localStorage.setItem('token', '');
        window.location.href = '/client/views/login.html';
	});
	})