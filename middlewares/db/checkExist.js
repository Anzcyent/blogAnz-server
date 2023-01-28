const Article = require('../../schemas/Article');
const CustomError = require('../../helpers/error/CustomError');
const errorWrapper = require('express-async-handler');

const checkArticleExists = errorWrapper(async (req, res, next) => {
    const { id } = req.params;

    const article = await Article.findById(id);

    if (!article) return next(new CustomError("Article not found. Please check your parameters.", 404));

    req.article = article;

    next();
})

module.exports = {
    checkArticleExists
}