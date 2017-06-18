

module.exports = function (req, res, next) {
    if (!req.session) {
        res.status(401).json('Вы не авторизованы');
        return next(401);
    }

    next();
}