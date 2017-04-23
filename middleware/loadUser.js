/**
 * Created by redgr on 22.04.2017.
 */

var User = require('../models/user').User;

module.exports = function (req, res, next) {
    req.user = res.locals.user = null;
    if(!req.session.user) return next();

    User.findById(req.session.user, function (err, user) {
        if(err) return next(err);

        req.user = res.locals.user = user;
        next();
    })
}