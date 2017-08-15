import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;

export type UserModel = mongoose.Document & {
    id:string,
    email:string,
    title:string,
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