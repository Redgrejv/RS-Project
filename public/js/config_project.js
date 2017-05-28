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

    // $(document).mouseup(function(e) {
    //     var div = $(".config ul");
    //     if (!div.is(e.target) &&
    //         div.has(e.target).length === 0) {
    //         div.hide('drop', 300, function() {
    //             $('ul', '.config').addClass('hide');
    //         });
    //     }
    // });

});