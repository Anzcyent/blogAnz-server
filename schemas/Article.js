const { Schema, model, Types } = require('mongoose');

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please provide a title for your article."],
        unique: true,
        minlength: 5,
        maxlength: 35
    },
    description: {
        type: String,
        required: [true, "Please provide a description for your article."],
        minlength: 100
    },
    author: {
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
})

module.exports = model("Article", ArticleSchema);