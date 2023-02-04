const Article = require('../../schemas/Article');
const CustomError = require('../../helpers/error/CustomError');
const errorWrapper = require('express-async-handler');

const checkArticleExists = errorWrapper(async (req, res, next) => {
    const { id } = req.params;

    const article = await Article.findById(id).populate({ path: "author", select: "name reputation" }).populate({ path: "comments", select: "description createdAt", options: { sort: { 'createdAt': -1 } }, populate: { path: "user", select: "name reputation" } });

    if (!article) return next(new CustomError("Makale bulunamadı. Lütfen parametrelerinizi kontrol edin.", 404));

    req.article = article;

    next();
});


const checkVoterOfArticle = errorWrapper(async (req, res, next) => {
    const article = await Article.findById(req.article._id);

    if (String(article.author._id) === String(req.user._id)) return next(new CustomError("You can't vote your own article.", 400));

    next();
})

module.exports = {
    checkArticleExists,
    checkVoterOfArticle
}