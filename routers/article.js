const express = require('express')
const router = express.Router();
const { createArticle, getAllArticles, getArticleById, getArticlesOfOwner, editArticle, deleteArticle, vote } = require('../controllers/article');
const { getAccessToRoute } = require('../middlewares/auth/auth');
const { checkArticleExists, checkVoterOfArticle } = require('../middlewares/db/check');

router.post('/create', getAccessToRoute, createArticle);
router.get('/', getAllArticles);
router.get('/article/:id', checkArticleExists, getArticleById);
router.get('/articles-of-owner', getAccessToRoute, getArticlesOfOwner);
router.put('/edit-article/:id', [getAccessToRoute, checkArticleExists], editArticle);
router.delete('/delete-article/:id', [getAccessToRoute, checkArticleExists], deleteArticle);
router.get('/vote/:id', [getAccessToRoute, checkArticleExists, checkVoterOfArticle], vote);

module.exports = router; 