$(document).ready(function() {
	$('#add-project-form__button').click(function(event) {
            event.preventDefault();
            $.ajax({
            	method: "POST",
            	headers: {'Authorization': localStorage.getItem('token')},
            	url: "http://localhost:3000/api/projects",
            	data:{title: $('#add-project-form__name').val()},
            	success: function(response){
            		//console.log(response);
            		$('.menu').append('<div class="menu__project" id="'+response.project._id+'"><div class="menu__project-img"></div><div class="menu__project-name">'+response.project.title+'</div></div>');
					$('#overlay').fadeOut(400);
					$('.modal-window').attr('style','');
					$('#add-project-form__name').val('');
            	},
            	error:  function(response){
            		//console.log(response);
            	}
            });
		});
})