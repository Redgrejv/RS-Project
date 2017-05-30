$(document).ready(function() {

    function message(text) {
        showMessage(text);
    }

    $('#create_project').click(function() {
        var project_name = $('#project_name').val();
        var his = $('.new_project');

        if (!project_name) {
            message('Укажите название проекта');
            return false;
        }

        console.log(project_name.length);

        if (project_name.length > 26) {
            message('Имя проекта слишком длинное. не более 26 символов');
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
                $('.menu-projects-list').append(
                    '<div class="added_project" id="' + response.project._id + '">' +
                    '<div class="project_name">' +
                    '<p>' + response.project.title + '</p>' +
                    '</div>' +
                    '<div class="config">' +
                    '<ul class="hide">' +
                    '<li title="Изменить данные проекта" class="patch">' +
                    '<img src="../public/image/tooltip-edit.png" alt="rename">' +
                    '</li>' +
                    '<li title="Удалить этот проект" class="delete">' +
                    '<img src="../public/image/delete-forever.png" alt="delete">' +
                    '</li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>');
            },
            error: function(response) {
                console.log(response);
                message(response.message);
            }
        });
        his.hide('drop', 600, function() {
            $('input', this).val('');
        });
    });

});