/**
 * Routes for Follows
 */

//requires
const express = require('express');
const api = express.Router();
const auth = require('../middlewares/authenticated');
const FollowController = require('../controllers/follow');

// Routes
api.get('/follow-test',FollowController.prueba);
api.post('/follow',auth.ensureAuth,FollowController.saveFollow);
api.delete('/follow/:id',auth.ensureAuth,FollowController.deleteFollow);
api.get('/followed/:id?/:page?', auth.ensureAuth,FollowController.getFollowedUsers);
api.get('/following/:id?/:page?', auth.ensureAuth, FollowController.getFollowingUsers);
api.get('/get-my-follows/:followed?/', auth.ensureAuth, FollowController.getMyFollows);
module.exports = api;
