const sendJWTToClient = (user, res) => {
    const access_token = user.createAccessToken();

    res
        .status(200)
        .json({
            success: true,
            access_token,
            data: { ...user._doc, password: undefined }
        })
}

module.exports = { sendJWTToClient }