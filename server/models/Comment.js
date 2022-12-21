const { Schema, model, Types: { ObjectId } } = require('mongoose');

const commentSchema = new Schema({
    comment: { type: String, require: true, minlength: [10, "Commentmust be at least 10 chars long!"], maxlength: [500, "Comment must be at least 10 chars long!"] },
    owner: {type: ObjectId, ref: 'User', require: true},
    article: {type: ObjectId, ref: 'Article', require: true},
    like: {type: Boolean, default: false}

}, {timestamps: { createdAt: 'created_at'}});

const Comment = model('Comment', commentSchema);

module.exports = Comment;