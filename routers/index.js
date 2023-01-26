const express = require('express');
const router = express.Router();
const auth = require('./auth');
const article = require('./article');

router.use('/auth', auth);
router.use('/article', article);

module.exports = router;