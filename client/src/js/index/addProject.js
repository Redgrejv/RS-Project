$(document).ready(function() {
	$('#add-project-form__button').click(function(event) {
            event.preventDefault();
            $.ajax({
            	method: "POST",
            	headers: {'Authorization': localStorage.getItem('token')},
            	url: "http://localhost:3000/api/projects",
            	data:{title: $('#add-project-form__name').val()},
            	success: function(response){
            		console.log(response);
            		$('.menu__projects').append('<div class="menu__project" id="'+
					response.project._id+'"><i class="icon-project"></i><div class="menu__project-name">'+
					response.project.title+'</div><i class="icon-options"></i><i class="icon-edit none"></i><i class="icon-delete none"></i><i class="icon-back none"></i></i></div>');
					$('#overlay').fadeOut(400);
					$('.modal-window').attr('style','');
					$('#add-project-form__name').val(''); 
            	},
            	error:  function(response){
            		console.log(response);
            	}
            });
		});
})