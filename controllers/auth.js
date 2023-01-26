const User = require('../schemas/User');
const errorWrapper = require('express-async-handler');
const CustomError = require('../helpers/error/CustomError');
const { sendJWTToClient } = require('../helpers/auth/tokenHelpers');
const { isMatchPassword } = require('../helpers/auth/authHelpers');

const register = errorWrapper(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password
    });

    sendJWTToClient(user, res);
});

const login = errorWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(new CustomError("There is no user with that email address.", 404));

    if (!isMatchPassword(password, user.password)) return next(new CustomError("Wrong password!", 404));

    sendJWTToClient(user, res);
})

const logout = errorWrapper(async (req, res, next) => {
    res
        .status(200)
        .clearCookie()
        .json({
            success: true,
            message: "Logout successful"
        })
});

const generateNewToken = errorWrapper(async (req, res, next) => {
    const user = await User.findById(req.user._id).select('-password');

    sendJWTToClient(user, res);
})

module.exports = { register, login, logout, generateNewToken }