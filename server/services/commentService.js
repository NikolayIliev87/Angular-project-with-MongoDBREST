const Comment = require("../models/Comment")

async function getById(commentId) {
    return Comment.findById(commentId).populate('article');
}

async function getAllByArticleId(articleId) {
    return Comment.find({'article': articleId}).populate('owner').sort({created_at: -1});
}

async function getAllByOwnerId(ownerId) {
    return Comment.find({'owner': ownerId}).populate('owner').sort({created_at: -1});
}

async function create(comment) {
    return Comment.create(comment)
}

async function commentAction(commentId) {
    const comment = await Comment.findById(commentId);

    comment.like = !comment.like
    await comment.save()
};



module.exports = {
    getById,
    getAllByArticleId,
    getAllByOwnerId,
    create,
    commentAction

}