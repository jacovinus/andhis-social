/**
 * Routes for likes
 */
//requires
const express = require('express');
const api = express.Router();
const auth = require('../middlewares/authenticated');
const LikeController = require('../controllers/like');

// Routes
api.get('/like/test',auth.ensureAuth,LikeController.prueba);
api.post('/like',auth.ensureAuth, LikeController.saveLike);
module.exports = api;