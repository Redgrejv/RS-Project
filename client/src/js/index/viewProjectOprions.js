  $(document).ready(function() {
      $('.menu__projects').on('click','.icon-options', function(){
        $('.icon-project').css('display','none');
        $('.menu__project-name').css('display','none');
        $(this).css('display','none');
        $('.icon-edit').css('display','none');
        $('.icon-delete').css('display','none');
        $('.icon-back').css('display','none');
        $('.content__project-name').text('Работает');
      })
  })