const CustomError = require('../helpers/error/CustomError');
const Article = require('../schemas/Article');
const Comment = require('../schemas/Comment');
const errorWrapper = require('express-async-handler');


const createComment = errorWrapper(async (req, res, next) => {
    const { description } = req.body;

    const comment = await Comment.create({
        description,
        article: req.article._id,
        user: req.user._id
    });

    const article = await Article.findById(req.article._id);

    article.comments.push(comment);
    await article.save();

    res
        .status(201)
        .json({
            success: true,
            data: comment
        })
})

module.exports = { createComment }