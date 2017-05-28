function showMessage(text) {
    $('<div class="message"><span>' + text + '</span></div>')
        .appendTo($('body'));

    setTimeout(function() {
        $('.message').hide('drop', 500, function() {
            $(this).remove();
        })
    }, 900);
}