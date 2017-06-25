$(document).ready(function() {

	$.ajax({
		type: "GET",
		url: "http://localhost:3000/api/projects/"+localStorage.getItem('user.id')+'/user',
        headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        success: function(response) {
                $(response).each(function(index) {
                	$('.menu__projects').append('<div class="menu__project" id="'
                    +this._id+'"><i class="icon-project"></i><div class="menu__project-name">'
                    +this.title+'</div><i class="icon-options"></i></div>');
                });
        },
        error: function(response){
        	//console.log(response);
        }
	});
});