$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: "http://localhost:3000/api/projects/",
        headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(response) {
                $(response).each(function(index) {
                    $('.projects').append('<div class="added_project" id="' + this._id + '">' +
                        '<div class="project_name">' +
                        '<p>' + this.title + '</p>' +
                        '</div>' +
                        '<div class="config">' +
                        '<ul class="hide">' +
                        '<li title="Изменить данные проекта" class="patch">' +
                        '<img src="../../build/img/tooltip-edit.png" alt="">' +
                        '</li>' +
                        '<li title="Удалить этот проект" class="delete">' +
                        '<img src="../../build/img/delete-forever.png" alt="">' +
                        '</li>' +
                        '</ul>' +
                        '</div>' +
                        '</div>');
                })
        },
        error: function(response) {
            console.log(response);
        }
    }).fail(function(jqXHR) {
        console.log(jqXHR);
    });

});