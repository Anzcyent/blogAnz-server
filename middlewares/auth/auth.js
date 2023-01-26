const CustomError = require('../../helpers/error/CustomError');
const errorWrapper = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { isTokenIncluded } = require('../../helpers/auth/authHelpers');
const User = require('../../schemas/User'); 

const getAccessToRoute = errorWrapper(async (req, res, next) => {
    if (!isTokenIncluded(req)) return next(new CustomError('You are not authorized to access this route, no token.', 401));
    const access_token = req.headers.authorization.split(':')[1];

    jwt.verify(access_token, process.env.JWT_ACCESS_SECRET, async (err, decoded) => {
        if (err) return next(new CustomError('You are not authorized to access this route.', 401));

        const user = await User.findById(decoded._id).select('-password');

        req.user = user;

        next();
    });
})

module.exports = {
    getAccessToRoute
}
