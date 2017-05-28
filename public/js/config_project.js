"use strict"

$(document).ready(function() {

    $('.projects').on('click', '.config', function(e) {
        if ($(this).has(e.target).length === 0) {
            var ul_config = $('ul', this);
            if (ul_config.hasClass('hide')) {
                ul_config.show('drop', 200, function() {
                    $(this).removeClass('hide');
                });
            } else {
                ul_config.hide('drop', 200, function() {
                    $(this).addClass('hide');
                });
            }
        }
    });

    $('.projects').on('click', '.patch', function() {

        console.log('Пропатчили');

    });

    $('.projects').on('click', '.delete', function() {

        var delete_block = $(this).parents('.added_project');
        var title = delete_block.find('.project_name p').text();
        var id = delete_block.attr('id');
        var confirm = prompt('Подтвердите удаление проекта, введитя его название: "' + title + '"');

        if (confirm === title) {

            $.ajax({
                type: "DELETE",
                url: "http://localhost:3000/api/projects/" + id,
                headers: { 'Authorization': localStorage.getItem('token') },
                success: function(response) {
                    delete_block.remove();
                    showMessage('Проект успешно удален');
                },
                error: function(response) {
                    console.log(response);
                    showMessage('Ошибка удаления: ' + response.message);
                }
            });

        } else {
            showMessage('Проект не удален. Введенные данные не совпадают с именем');
        }
    });

    $('.projects').on('click', '.patch', function() {

        var patch_block = $(this).parents('.added_project');
        var id = patch_block.attr('id');
        var new_title = prompt('Введите новое название проекта');

        if (new_title) {
            if (new_title.length <= 26) {

                $.ajax({
                    type: "PATCH",
                    url: "http://localhost:3000/api/projects/" + id,
                    headers: { 'Authorization': localStorage.getItem('token') },
                    data: { new_title: new_title },
                    success: function(res) {
                        showMessage(res.message);
                        patch_block.find('.project_name p').text(new_title);
                    },
                    error: function(res) {
                        console.log(res);
                        showMessage('Ошибка изменения имени проекта: ' + response.errorText);
                    }
                });

            } else {
                showMessage('Проект не переименован. Новое имя должно быть меньше 26 символов.');
            }
        } else {
            showMessage('Проект не переименован. Новое имя не должно быть пустым');

        }
    })
});