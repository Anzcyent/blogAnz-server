const { Schema, model, Types } = require('mongoose');

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please provide a title for your article."],
        unique: true,
        minlength: [10, "Please provide a title at least 10 characters long."]
    },
    description: {
        type: String,
        required: [true, "Please provide a description for your article."],
        minlength: [35, "Please provide a description at least 35 characters long."]
    },
    author: {
        type: Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

module.exports = model("Article", ArticleSchema);