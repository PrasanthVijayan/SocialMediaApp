var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var postSchema = new Schema({
    message: {type:String, required: true},
    author: { type: ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model('Post', postSchema);