/*
*Publication model
*/

// required elements
const mongoose = require('mongoose');
const schema = mongoose.Schema;
// publication model
const publicationSchema = schema({

    text : String,
    title: String,
    file : String,
    created_at : String,
    likes : String,
    user : { type : schema.ObjectId, ref : 'User' }
});

module.exports = mongoose.model('Publication',publicationSchema);