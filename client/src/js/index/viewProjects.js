$(document).ready(function() {

	$.ajax({
		type: "GET",
		url: "http://localhost:3000/api/projects/"+localStorage.getItem('user.id'),
        headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(response) {
                $(response).each(function(index) {
                	$('.menu').append('<div class="menu__project" id="'
                		+this._id+
                		'"><div class="menu__project-img">'
                		+'</div><div class="menu__project-name">'
                		+this.title+'</div></div>');
					
                })
        },
        error: function(response){
        	//console.log(response);
        }
	}).fail(function(jqXHR) {
        //console.log(jqXHR);
    });
});