$(document).ready(function () {
	//показ модального окна добавление проекта
	$('.menu__add-project').click(function () {
		event.preventDefault();
		$('#overlay').fadeIn(400, function () {
			$('.modal-window-add').css({ 'display': 'block', 'opacity': '1', 'top': '35%' });
		});
		$('#add-project-form__name').val('');
	});

	$('#add-project-form__button').on('click', function (event) {
		// $('#add-project-form__name').focus();
		event.preventDefault();
		$.ajax({
			method: "POST",
			headers: { 'Authorization': localStorage.getItem('token') },
			url: "http://localhost:3000/api/projects",
			data: { title: $('#add-project-form__name').val() },
			success: function (response) {
				console.log(response);
				$('.menu__projects').append('<div class="menu__project" id="' +
					response.project._id + '"><i class="icon-project"></i><div class="menu__project-name">' +
					response.project.title + '</div><i class="icon-options"></i><i class="icon-edit none"></i><i class="icon-delete none"></i><i class="icon-back none"></i></i></div>');
				$('.icon-close').click();
			},
			error: function (response) {
				console.log(response);
			}
		});
	});
})