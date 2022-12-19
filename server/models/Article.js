const { Schema, model, Types, Types: { ObjectId } } = require('mongoose');

const articleSchema = new Schema({
    title: { type: String, require: true, minlength: [5, "Title must be at least 5 chars long!"] },
    description: { type: String, require: true, minlength: [10, "Description must be at least 10 chars long!"]  },
    category: { type: String, default: 'other' },
    status: { type: Boolean, default: false},
    owner: {type: ObjectId, ref: 'User', require: true},
    followers: { type: [Types.ObjectId], ref: 'User', default: [] },
    // comments: { type: [Types.ObjectId], ref: 'Comment', default: [] }

}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

articleSchema.index({title: 1}, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Article = model('Article', articleSchema);

module.exports = Article;