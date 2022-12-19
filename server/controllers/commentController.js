const { hasUser } = require('../middlewares/guards');
const { getAllByArticleId, create, getAllByOwnerId, commentAction, getById } = require('../services/commentService');

const commentController = require('express').Router()

commentController.get('/article/:id', async (req, res) => {
    const comments = await getAllByArticleId(req.params.id);
    res.json(comments)
});

commentController.get('/owner/:id', async (req, res) => {
    const comments = await getAllByOwnerId(req.params.id)

    res.json(comments);
});

commentController.post('/', hasUser(), async (req, res) => {
    try {
        const data = Object.assign({owner: req.user._id}, req.body)
        const comment = await create(data);
        res.json(data);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

commentController.get('/:id/like', async (req, res) => {
    const comment = await getById(req.params.id)

    try {
        if (comment.article.owner != req.user._id) {
            return res.status(403).json({message: 'You are not owner of the article!'})
        }

        await commentAction(req.params.id);
        res.json(comment.article);
        
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});


module.exports = commentController;