$(document).ready(function() {
    $(".show_add_project").click(function() {
        // var add = $(this).closest('body').find('.new_project');
        // if (!add.is(':visible')) {
        //     $('.new_project').hide();
        //     add.show();
        // }

        var div_newProject = $('.new_project');

        if (div_newProject.hasClass('hide')) {
            div_newProject.show('drop', 400, function() {
                $(this).removeClass('hide');
            });
        } else {
            div_newProject.hide('drop', 400, function() {
                $(this).addClass('hide');
            });
        }
        // else{add.hide();}
        // $(this).closest('body').find('.menu_list').hide();
    });

    $(document).mouseup(function(e) {
        var div = $(".new_project");
        if (!div.is(e.target) &&
            div.has(e.target).length === 0) {
            div.hide('drop', 400, function() {
                $('.new_project').addClass('hide');
            });
        }
    });
});