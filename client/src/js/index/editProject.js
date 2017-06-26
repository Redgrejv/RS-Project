  $(document).ready(function() {
      $('.menu__projects').on('click', '.icon-edit', function(){
        event.preventDefault();
        var prname = prompt("Enter new project name", "Project");
        $.ajax({
            type: "PATCH",
            url: "http://localhost:3000/api/projects/" + localStorage.getItem('project.id'),
            headers:{ 'Authorization': localStorage.getItem('token') },
            data: { newTitle: prname },
            success: function(res){
                $('#'+localStorage.getItem('project.id')).find('.menu__project-name').text(prname);
				$('.content__project-name').text(prname);
            },
            error: function(res){

            }
        });
  })
  })