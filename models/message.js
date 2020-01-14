/**
 * Message Model
 */
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const messageSchema = schema({
emitter: { type: schema.ObjectId, ref: 'User' },
receiver: { type: schema.ObjectId, ref: 'User'},
viewed: String,
text : String,
created_at : String

});
// Export the module
module.exports = mongoose.model('Message',messageSchema);