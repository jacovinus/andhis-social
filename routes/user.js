/**
 * User Routes
 */
const express = require('express');
const UserController = require('../controllers/user');
const api = express.Router();
const auth = require('../middlewares/authenticated');
const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir:'./uploads/users'});

api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.get('/user/:id',auth.ensureAuth,UserController.getUser);
api.get('/users/:page?',auth.ensureAuth, UserController.getUsers);
api.put('/update-user/:id', auth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id', [auth.ensureAuth,md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);
api.get('/get-user-counters/:id?',auth.ensureAuth,UserController.getCounters);
api.get('/user', auth.ensureAuth, UserController.currentUser);

module.exports = api;