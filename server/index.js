const express = require('express');
const mongoose = require('mongoose');
const authController = require('./controllers/authController');
const commentController = require('./controllers/commentController');
const forumController = require('./controllers/forumController');
const cors = require('./middlewares/cors');
const session = require('./middlewares/session');
const trimBody = require('./middlewares/trimBody');

const connectionString = 'mongodb://localhost:27017/forum';

start();

async function start() {
    await mongoose.connect(connectionString);

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(trimBody());
    app.use(session());

    app.get('/', (req, res) => {
        res.json({message: 'REST Service Operational!'})
    });

    app.use('/users', authController);
    app.use('/articles', forumController);
    app.use('/comments', commentController);

    app.listen(3030, () => console.log('REST Service Started!'));
}