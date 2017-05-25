$(document).ready(function() {

    $.ajax({
        type: "POST",
        url: "http://localhost:3000/api/project/getUserAllProject",
        headers: { 'Authentication': localStorage('token') },
        success: function(response) {

        }
    });

});