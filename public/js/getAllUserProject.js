$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: "http://localhost:3000/api/projects",
        headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(response) {
            console.log(response);
        },
        error: function(response) {
            console.log(response);
        }
    }).fail(function(jqXHR) {
        console.log(jqXHR);
    });

});