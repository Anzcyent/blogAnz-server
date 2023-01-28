const express = require('express');
const router = express.Router();
const auth = require('./auth');
const article = require('./article');
const user = require('./user');

router.use('/auth', auth);
router.use('/article', article);
router.use('/user', user);

module.exports = router;