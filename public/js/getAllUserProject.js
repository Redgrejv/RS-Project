$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: "http://localhost:3000/api/projects",
        headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(response) {
            if (response.length > 0) {
                console.log(response);
                $(response).each(function(index) {
                    $('.projects').append('<div class="added_project" id="' + this._id + '">' +
                        '<div class="project_name">' +
                        '<p>' + this.title + '</p>' +
                        '</div>' +
                        '</div>');
                })
            }
        },
        error: function(response) {
            console.log(response);
        }
    }).fail(function(jqXHR) {
        console.log(jqXHR);
    });

});