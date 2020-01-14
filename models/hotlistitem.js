/**
 * Hotlist crea listas de publicaciones favoritas dentro de mi perfil
 * El boton sera add to hotlist (icono de fuego)
 * en modelo : id , publicationId(array), listName, created_at
 * El usuario debe seguir al usuario del que agrega su publicacion a lista
 */
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const User = require('./user');
const Publication = require('./publication');
const Hotlist = require('./hotlist');
const hotlistItemSchema = schema({
    list: { type: schema.ObjectId, ref: 'Hotlist'},
    user: { type: schema.ObjectId, ref: 'User'},
    publication: { type: schema.ObjectId, ref: 'Publication' },
    created_at: String
});

module.exports = mongoose.model('HotlistItem', hotlistItemSchema);