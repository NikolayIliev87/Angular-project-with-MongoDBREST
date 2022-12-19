const { register, login, logout, getProfile, editProfile } = require('../services/userService');
const { body, validationResult} = require('express-validator');
const { parseError } = require('../util/parser');
const { hasUser } = require('../middlewares/guards');

const authController = require('express').Router()

authController.post('/register',
    body('email').isEmail().withMessage('Invalid Email!'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long!'),
 async (req, res) => {
    try {
        const { errors } = validationResult(req);
        if (errors.length > 0) {
            throw errors;
        }
       const token = await register(req.body.email, req.body.firstname, req.body.lastname, req.body.personalinfo, req.body.password);
       res.json(token);
    } catch (error) {
        const message = parseError(error)
        res.status(400).json({
            message: error.message
        });
    }
});

authController.post('/login', async(req, res) => {
    try {
        const token = await login(req.body.email, req.body.password);
        res.json(token);
     } catch (error) {
        const message = parseError(error)
        res.status(401).json({ message });
     }
});

authController.get('/logout', async (req, res) => {
    const token = req.token;
    await logout(token);
    req.status(204).end();
});

authController.get('/:id', async (req, res) => {
    const profile = await getProfile(req.params.id);

    res.json(profile)
});

authController.put('/:id', hasUser(), async (req, res) => {
    const profile = await getProfile(req.params.id);
    if (req.user._id != profile._id) {
        return res.status(403).json({message: 'You can not modify this record!'})
    }

    try {
        const result = await editProfile(req.params.id, req.body);
        res.json(result)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

module.exports = authController;