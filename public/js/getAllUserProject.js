$(document).ready(function() {

    $.ajax({
        type: "POST",
        url: "http://localhost:3000/api/projects",
        headers: { 'Authentication': localStorage('token') },
        success: function(response) {

        }
    });

});