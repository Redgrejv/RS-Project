module.exports.email = function(email) {
    var regular = new RegExp("^(?:[-a-z\\d\+\\*\\/\\?!{}`~_%&'=^$#]+(?:\\.[-a-z\\d\\+\\*\\/\\?!{}`~_%&'=^$#]+)*)@(?:[-a-z\\d_]+\\.){1,12}[a-z]{2,7}$");
    return regular.test(email);
}

module.exports.names = function(names) {
    var regular = new RegExp('^[a-zA-Zа-яА-ЯёЁ-]{2,20}$');
    return regular.test(names);
}

module.exports.password = function(password) {
    var regular = new RegExp('(?=^.{4,20}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$');
    return regular.test(password);
}