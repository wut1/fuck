var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    id: { type: String, unique: true },
    email:{type:String,unique:true},
    password:String,
    passwordRestToken:String,
    passwordRestExpires:Date,
    github:String,
    tokens:Array,
    name: String,
    avatar: String,
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }]
})

var User = mongoose.model('User', userSchema);

export default User;