const { Schema, model, Types } = require('mongoose');

const CommentSchema = new Schema({
    description: {
        type: String,
        maxlength: [100, "Please don't exceed 100 characters."],
        minlength: [10, "Your comment should provide at least 10 characters."],
        required: [true, "You can't create empty comment."]
    },
    article: {
        type: Types.ObjectId,
        ref: "Article"
    },
    user: {
        type: Types.ObjectId,
        ref: "User"
    },
    votes: [
        {
            type: Types.ObjectId,
            ref: "User"
        }
    ]
}, {
    timestamps: true
});

module.exports = model("Comment", CommentSchema);