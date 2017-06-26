module.exports.email = function (email) {
    var regular = new RegExp("^(?:[-a-z\\d\+\\*\\/\\?!{}`~_%&'=^$#]+(?:\\.[-a-z\\d\\+\\*\\/\\?!{}`~_%&'=^$#]+)*)@(?:[-a-z\\d_]+\\.){1,12}[a-z]{2,7}$");
    return regular.test(email);
}

module.exports.names = function (names, options = { minLength: 2, maxLength: 20 }) {
    var regular = new RegExp('^[a-zA-Zа-яА-ЯёЁ -_]{' + options.minLength + ',' + options.maxLength + '}$');
    return regular.test(names);
}

module.exports.password = function (password) {
    var regular = new RegExp('(?=^.{4,20}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$');
    return regular.test(password);
}