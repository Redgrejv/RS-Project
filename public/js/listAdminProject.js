$(document).ready(function() {

    $('.block-menu').click(function(e) {

        if ($(e.target)[0] == $('.block-menu-list').find($(e.target))[0]) {
            $('.block-menu-list').hide('fold', 300, function() {
                $('.block-menu-list').addClass('hide');
            });
        } else {
            $('.block-menu-list').show('fold', 300, function() {
                $('.block-menu-list').removeClass('hide');
            });
        }

    });

    $(document).mouseup(function(e) {
        var div = $("#block-menu-list");
        if (!div.is(e.target) &&
            div.has(e.target).length === 0) {
            div.hide('fold', 300, function() {
                $('.block-menu-list').addClass('hide');
            });
        }
    });

});


var localhost = 'http://localhost:3000/';
var apiProjects = 'api/projects/'

function projectInsert(token) {
    $.ajax({
        type: "POST",
        url: localhost + apiProjects,
        success: function(response) {

        }
    });
}

function projectPatch(params) {

}

function projectDelete(params) {

}