const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, require: true, unique: true },
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    personalinfo: { type: String, default: 'No Personal Info!' },
    // comments: { type: [Types.ObjectId], ref: 'Comment', default: [] },
    // likes: { type: [Types.ObjectId], ref: 'Comment', default: [] },
    // articles: { type: [Types.ObjectId], ref: 'Article', default: [] },
    hashedPassword: { type: String, require: true },
}, {timestamps: { createdAt: 'created_at'}});

userSchema.index({email: 1}, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;