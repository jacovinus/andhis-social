/**
 * Hotlist crea listas de publicaciones favoritas dentro de mi perfil
 * El boton sera add to hotlist (icono de fuego)
 * en modelo : id , publicationId(array), listName, created_at
 * El usuario debe seguir al usuario del que agrega su publicacion a lista
 */
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const User = require('./user');
const hotlistSchema = schema({
listname : String,
created_at: String,
updated_at: String,
user: {type: schema.ObjectId, ref: 'User'}
});
// @TODO : contador de publicaciones dentro del hotlist
module.exports = mongoose.model('Hotlist', hotlistSchema);