$(document).ready(function () {
	//проверяем авторизирован ли пользовате
	var token = localStorage.getItem('token');
	if (!token) {
		setTimeout(function () {
			$('#overlay').fadeIn(400, function () {
				$('.modal-window-attention').css({ 'display': 'block', 'opacity': '1', 'top': '35%' });
			});
			window.location.href = '/client/views/login.html';
		}, 10000);
	}

	var projects_height = $('.menu__projects').height();
	projects_height = projects_height - 113;
	$('.menu__projects').css('height', projects_height);


	//show-hide-menu
	$('.menu__header').on('click', '.hide-menu', function () {
		$(".menu__header-text").css('display', 'none');
		$('.menu__header').css('padding', '24px 0');
		$('.menu__header').css('justify-content', 'center');
		$('.menu__project-name').css('display', 'none');
		$('.menu__project').css('justify-content', 'center');
		$('.icon-options').css('display', 'none');
		$('.icon-project').css('margin-left', '0');
		$('.menu').removeClass('menu__hide');
		$('.menu').addClass('menu__show');
		$('.icon-backburger').removeClass('hide-menu');
		$('.icon-backburger').addClass('show-menu');

	})

	$('.menu__header').on('click', '.show-menu', function () {
		$('.menu__header').removeAttr('style');
		$('.menu__header').children().each(function () {
			$(this).removeAttr('style');
		})
		$('.menu__project').children().each(function () {
			$(this).removeAttr('style');
		})

		$('.menu').removeClass('menu__show');
		$('.menu').addClass('menu__hide');
		$('.icon-backburger').removeClass('show-menu');
		$('.icon-backburger').addClass('hide-menu');
	})



	//закрытие модального окна
	$('.icon-close').on('click', function () {
		$('#overlay').fadeOut(400);
		$('.icon-close').parent().removeAttr('style');
		$('#add-project-form__name').val('');
	});

	$('#overlay').on('click', function () {
		$('#overlay').fadeOut(400);
		$('.modal-window-add').removeAttr('style');
		$('.modal-window-edit').removeAttr('style');
		$('.modal-window-delete').removeAttr('style');
		$('#add-project-form__name').val('');

	})

	$('.menu').on('click', '.menu__project', function () {
		var project_name = $(this).find('.menu__project-name').text();
		var id = $(this).attr('id');
		localStorage.setItem('project.id', id)
		$('.content__project-name').text(project_name);

	});


	//выход
	$('.icon-exit').on('click', function () {
		localStorage.setItem('token', '');
		window.location.href = '/client/views/login.html';
	});
	//список
	// $('.options').mouseup(function(){
	// 	$('#options-overlay').fadeOut(400);
	// 	$('.project-options').attr('style','');
	// })

	$('.icon-plus-circle').on('click', function () {
		if ($('.project-options').css('display', 'none')) {
			$('.project-options').css('display', 'block');
		} else {
			$('.project-options').removeAttr('style');
		}
	})

	$('.project-options').on('click', function (e) {
		if ($(this).has(e.target.length === 0) && $(this).css('display', 'block')) {
			$(this).css('display', 'none');
		}
	})
})