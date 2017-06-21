$(document).ready(function() {
    $('.projects').on('click', '.added_project', function() {
        var project_name = $(this).find('p').text();
        $('h3.project_name').text(project_name);
    });

})