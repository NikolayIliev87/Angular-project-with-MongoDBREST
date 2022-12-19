const Article = require("../models/Article")

async function getAll() {
    return Article.find({}).populate('owner').sort({created_at: -1});
}

async function getLatest() {
    return Article.find({}).populate('owner').sort({created_at: -1}).limit(6);
}

async function getById(id) {
    return Article.findById(id);
}

async function getByListOfId(ids) {
    return Article.find({'_id' : { $in : ids}}).populate('owner');
}

async function getByIdWithOwner(id) {
    return Article.findById(id).populate('owner');
}

async function getAllByOwner(ownerId) {
    return Article.find({'owner': ownerId}).sort({created_at: -1});
}

async function getAllByFollower(followerId) {
    return Article.find({'followers': { $in : [followerId]}}).sort({created_at: -1});
}

async function create(article) {
    return Article.create(article);
}

async function edit(id, article) {
    const existing = await Article.findById(id);

    existing.title = article.title;
    existing.description = article.description;
    existing.category = article.category;
    existing.status = article.status;

    return existing.save();
}

async function editStatus(id, status) {
    const existing = await Article.findById(id);
    existing.status = status.status
    await existing.save()
};

async function deleteById(id) {
    return Article.findByIdAndDelete(id);
}

async function followArticle(articleId, userId) {
    const article = await Article.findById(articleId);

    article.followers.push(userId);
    await article.save()
};

async function unfollowArticle(articleId, userId) {
    const article = await Article.findById(articleId);

    const index = article.followers.indexOf(userId);
    if (index > -1) {
        article.followers.splice(index, 1)
        await article.save()
    }
};


module.exports = {
    getAll,
    getLatest,
    getById,
    getByListOfId,
    getByIdWithOwner,
    getAllByOwner,
    getAllByFollower,
    create,
    edit,
    editStatus,
    deleteById,
    followArticle,
    unfollowArticle
}