const CustomError = require('../helpers/error/CustomError');
const Article = require('../schemas/Article');
const Comment = require('../schemas/Comment');
const errorWrapper = require('express-async-handler');
const User = require('../schemas/User');


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
});

const vote = errorWrapper(async (req, res, next) => {
    const comment = await Comment.findById(req.comment._id);

    const comment_owner = await User.findById(comment.user._id);

    if (comment.votes.includes(req.user._id)) {
        comment.votes.remove(req.user._id);

        comment_owner.reputation = comment_owner.reputation - 5;

    } else {
        comment.votes.push(req.user._id);

        comment_owner.reputation = comment_owner.reputation + 5;
    }

    await comment_owner.save();

    await comment.save();

    res
        .status(200)
        .json({
            success: true,
            data: comment
        })
})

const deleteComment = errorWrapper(async (req, res, next) => {
    const comment = await Comment.findByIdAndDelete(req.comment._id);

    res
    .status(200)
    .json({
        success: true,
        data: comment
    });
});

module.exports = { createComment, vote, deleteComment }