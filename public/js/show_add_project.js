$(document).ready(function() {
    $(".show_add_project").click(function() {
        var add = $(this).closest('body').find('.new_project');
        if (!add.is(':visible')) {
            $('.new_project').hide();
            add.show();
        }
        // else{add.hide();}
        // $(this).closest('body').find('.menu_list').hide();
    });
});