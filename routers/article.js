const express = require('express')
const router = express.Router();
const { createArticle, getAllArticles, getArticleById, getArticlesOfOwner, editArticle, deleteArticle } = require('../controllers/article');
const { getAccessToRoute } = require('../middlewares/auth/auth');
const { checkArticleExists } = require('../middlewares/db/checkExist');

router.post('/create', getAccessToRoute, createArticle);
router.get('/', getAllArticles);
router.get('/:id', checkArticleExists, getArticleById);
router.get('/articles-of-owner', getAccessToRoute, getArticlesOfOwner);
router.put('/edit-article/:id', [getAccessToRoute, checkArticleExists], editArticle);
router.delete('/delete-article/:id', [getAccessToRoute, checkArticleExists], deleteArticle);

module.exports = router; 