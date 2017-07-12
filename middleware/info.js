<<<<<<< HEAD
/**
 * Created by redgr on 25.04.2017.
 */


var pkginfo = require('pkginfo')(module);
var Promise = require('bluebird');

module.exports = {
    getVersion
}

function getVersion() {
    return new Promise(function (resolve, reject) {
        return resolve(module.exports.version);
    })
=======
/**
 * Created by redgr on 25.04.2017.
 */


var pkginfo = require('pkginfo')(module);

module.exports.getVersion = function(req, res, next) {
    res.json(module.exports.version);
>>>>>>> origin/34-
};