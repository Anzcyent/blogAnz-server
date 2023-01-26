const bcrypt = require('bcryptjs');

const isMatchPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

const isTokenIncluded = (req) => {
    return req.headers.authorization && req.headers.authorization.startsWith('Bearer:');
}

module.exports = { isMatchPassword, isTokenIncluded }