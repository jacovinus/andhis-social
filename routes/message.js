/**
 * Message Routes
 */
const express = require('express');
const MessageController = require('../controllers/message');
const auth = require('../middlewares/authenticated');
const api = express.Router();
api.post('/message',auth.ensureAuth,MessageController.saveMessage);
api.get('/message-pruebas',auth.ensureAuth,MessageController.pruebasMessage);
api.get('/messages/received/:page?',auth.ensureAuth,MessageController.getMessagesReceived);
api.get('/messages/sent/:page?',auth.ensureAuth,MessageController.getMessagesSent);
api.get('/messages/unread', auth.ensureAuth, MessageController.getMessagesUnread);
api.get('/messages/read', auth.ensureAuth, MessageController.setMessagesRead);

module.exports = api; 