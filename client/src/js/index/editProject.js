$(document).ready(function () {
    //показ модального окна редактирования проекта
    $('.menu__projects').on('click', '.icon-edit', function () {
        event.preventDefault();
        $('#overlay').fadeIn(400, function () {
            $('.modal-window-edit').css({ 'display': 'block', 'opacity': '1', 'top': '35%' });
            $('#edit-project-form__name').focus()
        });
    });


    $('#edit-project-form__button').on('click', function (event) {
        event.preventDefault();
        var prname = $('#edit-project-form__name').val();
        $.ajax({
            type: "PATCH",
            url: "http://localhost:3000/api/projects/" + localStorage.getItem('project.id'),
            headers: { 'Authorization': localStorage.getItem('token') },
            data: { newTitle: prname },
            success: function (res) {
                $('#' + localStorage.getItem('project.id')).find('.menu__project-name').text(prname);
                $('.content__project-name').text(prname);
                $('.icon-close').click();
                $('#' + localStorage.getItem('project.id')).find('.icon-back').click();
            },
            error: function (res) {

            }
        });
    })
})