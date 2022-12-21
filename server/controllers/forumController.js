const { hasUser } = require('../middlewares/guards');
const { getAll, create, getById, edit, deleteById, getLatest, getByIdWithOwner, followArticle, getAllByOwner, getAllByFollower, getByListOfId, unfollowArticle, editStatus } = require('../services/articleService');
const { parseError } = require('../util/parser');

const forumController = require('express').Router()

forumController.get('/', async (req, res) => {
    const articles = await getAll();

    res.json(articles);
});

forumController.get('/owner/:id', async (req, res) => {
    const articles = await getAllByOwner(req.params.id);

    res.json(articles);
});

forumController.get('/follower/:id', async (req, res) => {
    const articles = await getAllByFollower(req.params.id);

    res.json(articles);
});

forumController.get('/latest', async (req, res) => {
    const articles = await getLatest();

    res.json(articles);
});

forumController.post('/', hasUser(), async (req, res) => {
    try {
        const data = Object.assign({owner: req.user._id}, req.body)
        const article = await create(data);
        res.json(article);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

forumController.get('/:id', async (req, res) => {
    const article = await getByIdWithOwner(req.params.id);
    res.json(article)
});

forumController.get('/list/:id', async (req, res) => {
    const articles = await getByListOfId(req.params.id.split(','));
    res.json(articles)
});

forumController.put('/:id', hasUser(), async (req, res) => {
    const article = await getById(req.params.id);
    if (req.user._id != article.owner) {
        return res.status(403).json({message: 'You can not modify this record!'})
    }

    try {
        const result = await edit(req.params.id, req.body);
        res.json(result)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

forumController.put('/:id/status', hasUser(), async (req, res) => {
    const article = await getById(req.params.id);
    if (req.user._id != article.owner) {
        return res.status(403).json({message: 'You can not modify this record!'})
    }

    try {
        const result = await editStatus(req.params.id, req.body);
        res.json(result)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

forumController.delete('/:id', hasUser(), async (req, res) => {
    const article = await getById(req.params.id);

    if (req.user._id != article.owner) {
        return res.status(403).json({message: 'You can not delete this record!'})
    }

    try {
        await deleteById(req.params.id);
        res.status(204).end();
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

forumController.get('/:id/follow', async (req, res) => {
    const article = await getById(req.params.id)

    try {
        if (article.owner == req.user._id) {
            return res.status(403).json({message: 'Can not follow your own article!'})
        }

        if (article.followers.map(f => f.toString()).includes(req.user._id.toString())) {
            return res.status(403).json({message: 'Can not follow twice!'})
        }

        await followArticle(req.params.id, req.user._id);
        res.json(article);
        
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

forumController.get('/:id/unfollow', async (req, res) => {
    const article = await getById(req.params.id)

    try {
        if (article.owner == req.user._id) {
            return res.status(403).json({message: 'Can not unfollow your own article!'})
        }

        if (article.followers.map(f => f.toString()).includes(req.user._id.toString())) {
            await unfollowArticle(req.params.id, req.user._id);
            res.json(article);
        } else {
            return res.status(403).json({message: 'Can not unfollow article which is not yet followed!'})
        }

    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

module.exports = forumController;