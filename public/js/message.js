function showMessage(text) {
    $('<div class="message"><span>' + text + '</span></div>')
        .appendTo($('body'));
}