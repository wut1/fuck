import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;
import * as bcrypt from "bcrypt-nodejs";
export type UserModel = mongoose.Document & {
    id:string,
    email:string,
    password:string,
    passwordRestToken:string,
    passwordRestExpires:Date,
    github:string,
    tokens:AuthToken[],
    name: string,
    avatar: string,
    notes:any[],
    comparePassword: any
}
export type AuthToken = {
    accessToken: string,
    kind: string
  };
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

userSchema.methods.comparePassword = (candidatePassword:string, cb:(err:any,isMatch:any)=>{})=> {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      cb(err, isMatch);
    });
  };
  

var User = mongoose.model('User', userSchema);

export default User;