$(document).ready(function() {
    $('.project-option__delete-project').on('click', function(){

		//delete_block= $()

        event.preventDefault();
            $.ajax({
            	type: "DELETE",
            	headers: {'Authorization': localStorage.getItem('token')},
            	url: "http://localhost:3000/api/projects/"+localStorage.getItem('uer.id'),
            	success: function(response){
                    delete_block.remove();
            	}, 
            	error:  function(response){
            		//console.log(response);
            	}
            });
    })

})