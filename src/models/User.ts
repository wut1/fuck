import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;

export type UserModel = mongoose.Document & {
    id:string,
    email:string,
    password:string,
    passwordRestToken:string,
    passwordRestExpires:Date,
    github:string,
    tokens:any[],
    name: string,
    avatar: string,
    notes:any[]
}
var userSchema = new Schema({
    _id: { type: String, unique: true },
    email:{type:String},
    password:String,
    passwordRestToken:String,
    passwordRestExpires:Date,
    github:String,
    tokens:Array,
    name: String,
    avatar: String,
    notes: [{
        type: Number,
        ref: 'Article'
    }]
})

var User = mongoose.model('User', userSchema);

export default User;