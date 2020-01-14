/**
 * like model
 */
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const User = require('./user');
const Publication = require('./publication');
//like schema
const likeSchema = schema({
    liked: { type : schema.ObjectId, ref: 'Publication'},
    user: { type : schema.ObjectId, ref: 'User'},
    created_at:String
});

module.exports = mongoose.model('Like',likeSchema);