var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    description: { type: String },
    age: { type: Number },
    sex: { type: String }
})

userSchema.pre('save', function(next){
    var user = this

    if(!user.isModified('password'))
        return next()

    bcrypt.hash(user.password, null, null, (err, hash) => {
        if(err) return next(err)

        user.password = hash
        next()
    })
})

module.exports = mongoose.model('User', userSchema);