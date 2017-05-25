$(document).ready(function() {
	$('.create_project').click(function(){
		var project_name = $('#project_name').val();
		var his = $(this).closest('body').find('.new_project');
    	$('.projects').append('<div class="added_project">'+
            '<div class="project_name">'+
                '<p>'+project_name+'</p>' +
            '</div>'+
        '</div>');
    	his.hide();
    }   );

})
// $('.added_project').click(function(){
// 		var project_name = $('#project_name').val();
// 		// var his = $(this).closest('body').find('.new_project');
//     	$('.task_panel').append('<div class="project_name">'+
//                 project_name +
//             '</div>');
//     	// his.hide();
//     }   ); 
