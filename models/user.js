/**
 * User Model
 */

//required elements
const mongoose = require('mongoose');
const schema = mongoose.Schema;
// user model
const userSchema = schema({
    name : String,
    surname : String,
    nick : String,
    email : String,
    description: String,
    password : String,
    role : String,
    gettoken: Boolean,
    image : String

});


module.exports = mongoose.model('User',userSchema);