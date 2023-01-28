const User = require('../schemas/User');
const CustomError = require('../helpers/error/CustomError');
const errorWrapper = require('express-async-handler');


const getUser = errorWrapper(async (req, res, next) => {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return next(new CustomError('User not found', 404));

    res
        .status(200)
        .json({
            success: true,
            data: user
        });
});

const getAllUsers = errorWrapper(async (req, res, next) => {
    const users = await User.find().select('-password');

    res
        .status(200)
        .json({
            success: true,
            data: users
        });
});

module.exports = { getUser , getAllUsers}