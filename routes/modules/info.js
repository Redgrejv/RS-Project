/**
 * Created by redgr on 25.04.2017.
 */

var HttpError = require('../../error').HttpError;

exports.version = function (req, res, next) {
    console.log(1);
    var fs = require('fs');
    var arr = __dirname.split("\\");
    arr.splice(arr.length - 2, 2);
    fs.readFile(arr.join('\\') + '\\package.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            return next(new HttpError(500, err.message));
        }
        res.json(JSON.parse(data).version);
    });
};