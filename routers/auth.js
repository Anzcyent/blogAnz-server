const express = require('express');
const { register, login, logout, generateNewToken } = require('../controllers/auth');
const router = express.Router();
const {getAccessToRoute} = require('../middlewares/auth/auth')

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/generate_new_token', getAccessToRoute, generateNewToken)



module.exports = router;