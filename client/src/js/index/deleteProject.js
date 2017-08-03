$(document).ready(function () {
	$('.menu__projects').on('click', '.icon-delete', function () {
		event.preventDefault();
		var project_name = $('#' + localStorage.getItem('project.id')).find('.menu__project-name').text();
		$('#modal-window-delete__question').text('Вы действительно хотите удалить проект "' + project_name + '"?');
		$('#overlay').fadeIn(400, function () {
			$('.modal-window-delete').css({ 'display': 'block', 'opacity': '1', 'top': '35%' });
			$('#delete-project-form__no').focus();
		});
	});

	$('#delete-project-form__no').on('click', function () {
		event.preventDefault();
		$('.icon-close').click();
		$('#' + localStorage.getItem('project.id')).find('.icon-back').click();
	});

	$('#delete-project-form__yes').on('click', function () {
		event.preventDefault();
		$.ajax({
			type: "DELETE",
			headers: { 'Authorization': localStorage.getItem('token') },
			url: "http://localhost:3000/api/projects/" + localStorage.getItem('project.id'),
			success: function (response) {
				$('#' + localStorage.getItem('project.id')).remove();
				localStorage.setItem('project.id', '');
				$('.content__project-name').text('');
				$('#options-overlay').fadeOut(400);
				$('.icon-close').click();
			},
			error: function (response) {
				//console.log(response);
			}
		});
	});

})
