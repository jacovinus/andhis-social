/**
 * Routes for Hotlist
 */

//router module
const express = require('express');
const api = express.Router();
const auth = require('../middlewares/authenticated');
const HotlistController = require('../controllers/hotlist');
const HotlistItemController = require('../controllers/hotlistitem');

// Routes hotlist
api.get('/hotlist-prueba',auth.ensureAuth, HotlistController.hotlistTest);
api.get('/hotlist/:id', auth.ensureAuth,HotlistController.getHotlist);
api.get('/hotlists', auth.ensureAuth, HotlistController.getHotlists);
api.post('/hotlist', auth.ensureAuth, HotlistController.saveHotlist);
api.delete('/hotlist/:id', auth.ensureAuth,HotlistController.deleteHotlist);
api.put('/hotlist/:id',auth.ensureAuth,HotlistController.updateHotlist);

// Routes HotList Item
api.get('/hotlistitem/prueba', auth.ensureAuth, HotlistItemController.prueba);
api.get('/hotlistitems/:hotlist',auth.ensureAuth, HotlistItemController.getHotlistItems);
api.post('/hotlistitem', auth.ensureAuth, HotlistItemController.saveHotlistItem);
api.delete('/hotlistitem/:id',auth.ensureAuth,HotlistItemController.deleteHotlistItem);


module.exports = api;


