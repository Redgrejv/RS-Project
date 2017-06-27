  $(document).ready(function() {
      $('.menu__projects').on('click', '.icon-options', function(){
        options($(this));
      })


      $('.menu__projects').on('click','.icon-back', function(){
        options($(this));
      })

      function options(button){
        var parent_block = button.parent(); 
        $(parent_block).children().each(function () { 
         $(this).toggleClass('none'); 
        })
      }
  })