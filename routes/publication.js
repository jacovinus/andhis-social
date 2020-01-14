
/*
* Publication Routes
*/

const express = require('express');
const PublicationController = require('../controllers/publication');
const api = express.Router();
const auth = require('../middlewares/authenticated');
const multipart = require('connect-multiparty');
const uploadPublication = multipart({ uploadDir : './uploads/publications'});
api.post('/publication', auth.ensureAuth, PublicationController.savePublication);
api.get('/publication/probando',auth.ensureAuth,PublicationController.probandoPubli);
api.get('/publications/:page?',auth.ensureAuth,PublicationController.getPublications);
api.get('/publications/:user/:page?',auth.ensureAuth,PublicationController.getUserPublications);
api.get('/publication/:id', auth.ensureAuth, PublicationController.getPublication);
api.delete('/publication/:id', auth.ensureAuth, PublicationController.deletePublication);
api.post('/publication/upload-image-pub/:id', [auth.ensureAuth,uploadPublication], PublicationController.uploadImage);
api.get('/publication/image/:imageFile',PublicationController.getImageFile);

module.exports = api;