/**
 * Created by redgr on 25.04.2017.
 */

var HttpError   = require('../../error').HttpError;
var pkginfo     = require('pkginfo')(module);

exports.vers = function (req, res, next) {
    res.json(module.exports.version);
    res.end();

    // var fs = require('fs');
    // var arr = __dirname.split("\\");
    // arr.splice(arr.length - 2, 2);
    // fs.readFile(arr.join('\\') + '\\package.json', 'utf8', function (err, data) {
    //     if (err) {
    //         console.log(err);
    //         return next(new HttpError(500, err.message));
    //     }
    //     res.json(JSON.parse(data).version);
    // });
};