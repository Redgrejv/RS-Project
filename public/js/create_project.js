$(document).ready(function() {

    function message(text) {
        $('<div class="message"><span>' + text + '</span></div>')
            .appendTo($('body'))
            .css('display', 'none')
            .show('highlight', 500);

        setTimeout(function() {
            $('.message').hide('drop', 500, function() {
                $(this).remove();
            })
        }, 900);
    }

    $('#create_project').click(function() {
        var project_name = $('#project_name').val();
        var his = $('.new_project');

        if (!project_name) {
            message('Укажите название проекта');
            return false;
        }

        if (!localStorage.getItem('token')) {
            message('Вы не авторизованы для этого');
            return false;
        }

        $.ajax({
            method: "POST",
            url: "http://localhost:3000/api/projects",
            data: { title: project_name },
            headers: { 'Authorization': localStorage.getItem('token') },
            success: function(response) {
                console.log(response);
                $('.projects').append(
                    '<div class="added_project" id="' + response.project._id + '">' +
                    '<div class="project_name">' +
                    '<p>' + response.project.title + '</p>' +
                    '</div>' +
                    '</div>'
                );
            },
            error: function(response) {
                console.log(response);
                message(response);
            }
        });
        his.hide('drop', 600, function() {
            $('input', this).val('');
        });

        // $('.projects').append('<div class="added_project">' +
        //     '<div class="project_name">' +
        //     '<p>' + project_name + '</p>' +
        //     '</div>' +
        //     '</div>');
        // his.hide();
    });

});