const Article = require('../schemas/Article');
const errorWrapper = require('express-async-handler');
const CustomError = require('../helpers/error/CustomError');
const User = require('../schemas/User');


const createArticle = errorWrapper(async (req, res, next) => {
    const { title, description } = req.body;
    const user = await User.findById(req.user._id);

    const article = await Article.create({
        title,
        description,
        author: user._id
    });

    article.populate({ path: "author", select: "name" })
    user.articles.push(article);

    await article.save();
    await user.save();

    res
        .status(201)
        .json({
            success: true,
            message: "Article has been created successfully",
            data: article
        })
});


const getAllArticles = errorWrapper(async (req, res, next) => {
    const articles = await Article.find().populate({ path: "author", select: "name" });

    res
        .status(200)
        .json({
            success: true,
            data: articles
        })
});

const getArticleById = errorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const article = await Article.findById(id).populate({ path: "author", select: "name" });

    if (!article) return next(new CustomError("Article Not Found", 404));

    res
        .status(200)
        .json({
            success: true,
            data: article
        })
});

const getArticlesOfOwner = errorWrapper(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate('articles');

    res
        .status(200)
        .json({
            success: true,
            data: user.articles
        })
});

const editArticle = errorWrapper(async (req, res, next) => {
    const article = await Article.findByIdAndUpdate(req.article._id, req.body, {
        timestamps: true,
        new: true
    });


    res
        .status(200)
        .json({
            success: true,
            data: article
        });
});

const deleteArticle = errorWrapper(async (req, res, next) => {
    const article = await Article.findByIdAndRemove(req.article._id);

    res
        .status(200)
        .json({
            success: true,
            data: article
        });
});






module.exports = { createArticle, getAllArticles, getArticleById, getArticlesOfOwner, editArticle, deleteArticle };
