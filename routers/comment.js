const express = require('express');
const router = express.Router();
const { createComment, vote, deleteComment } = require('../controllers/comment');
const { getAccessToRoute } = require('../middlewares/auth/auth');
const { checkArticleExists, checkCommentExists, checkVoterOfComment, checkCommentDeletionAuth } = require('../middlewares/db/check');

router.post('/create/:id', [getAccessToRoute, checkArticleExists], createComment);
router.get('/vote/:id', [getAccessToRoute, checkCommentExists, checkVoterOfComment], vote);
router.delete('/delete/:id', [getAccessToRoute, checkCommentExists, checkCommentDeletionAuth], deleteComment);


module.exports = router;