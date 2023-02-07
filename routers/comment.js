const express = require('express');
const router = express.Router();
const { createComment, vote } = require('../controllers/comment');
const { getAccessToRoute } = require('../middlewares/auth/auth');
const { checkArticleExists, checkCommentExists, checkVoterOfComment } = require('../middlewares/db/check');

router.post('/create/:id', [getAccessToRoute, checkArticleExists], createComment);
router.get('/vote/:id', [getAccessToRoute, checkCommentExists, checkVoterOfComment], vote);


module.exports = router;