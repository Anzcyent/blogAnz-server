const express = require('express');
const router = express.Router();
const { createComment } = require('../controllers/comment');
const { getAccessToRoute } = require('../middlewares/auth/auth');
const { checkArticleExists } = require('../middlewares/db/check');

router.post('/create/:id', [getAccessToRoute, checkArticleExists], createComment);


module.exports = router;