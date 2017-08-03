/**
 * Created by redgr on 25.04.2017.
 */


var pkginfo = require('pkginfo')(module);

module.exports.getVersion = function(req, res, next) {
    res.json(module.exports.version);
};