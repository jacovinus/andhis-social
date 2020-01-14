/** 
 * Follow Model
 */
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const User = require('./user');
// follow model
const followSchema = schema({
    user : { type : schema.ObjectId, ref : 'User'},
    followed: { type: schema.ObjectId, ref: 'User' }
   
  
});

module.exports = mongoose.model('Follow',followSchema);