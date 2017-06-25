$(document).ready(function() {
    $('.menu__projects').on('click', '.icon-delete', function(){

        event.preventDefault();
            $.ajax({
            	type: "DELETE",
            	headers: {'Authorization': localStorage.getItem('token')},
            	url: "http://localhost:3000/api/projects/"+localStorage.getItem('project.id'),
            	success: function(response){
                    $('#'+localStorage.getItem('project.id')).remove();
					localStorage.setItem('project.id','');
					$('.content__project-name').text('');
					$('#options-overlay').fadeOut(400);
					$('.project-options').attr('style','');
            	}, 
            	error:  function(response){
            		//console.log(response);
            	}
            });
    })

})