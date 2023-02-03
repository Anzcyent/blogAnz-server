const express = require('express');
const router = express.Router();
const auth = require('./auth');
const article = require('./article');
const user = require('./user');
const comment = require('./comment');

router.use('/auth', auth);
router.use('/article', article);
router.use('/user', user);
router.use('/comment', comment);

module.exports = router;