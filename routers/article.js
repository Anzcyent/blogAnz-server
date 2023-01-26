const express = require('express')
const router = express.Router();
const { createArticle, getAllArticles, getArticleById, getArticlesOfOwner } = require('../controllers/article');
const { getAccessToRoute } = require('../middlewares/auth/auth');

router.post('/create', getAccessToRoute, createArticle);
router.get('/', getAllArticles);
router.get('/article/:id', getArticleById);
router.get('/articles-of-owner', getAccessToRoute, getArticlesOfOwner);

module.exports = router; 