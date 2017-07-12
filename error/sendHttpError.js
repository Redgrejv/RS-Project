/**
 * Created by redgr on 15.04.2017.
 */

module.exports = function (error, req, res, next) {
    res.sendHttpError = function (error) {
        res.statusCode(error.status);
        if(req.headers['x-requested-with'] == 'XMLHttpRequest'){
            res.json(error);
        }else{
            res.render('error', {error: error});
        }
    }
    next();
}