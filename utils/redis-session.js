
var HttpError = require('../error').HttpError;

module.exports = function (req, res, next) {
    if (!req.session)
        return next(new HttpError(401, 'Вы не авторизованы'));

    if (req.session.user.key !== req.token)
        return next(new HttpError(400, 'Токен устарел, авторизуйтесь заново'));

    next();
}