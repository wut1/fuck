import * as mongoose from 'mongoose';
// import passport = require("./../config/passport")
import * as crypto from "crypto";
let Schema = mongoose.Schema;
import * as bcrypt from "bcrypt-nodejs";

export type UserModel = mongoose.Document & {
    id:string,
    email:string,
    password:string,
    passwordRestToken:string,
    passwordRestExpires:Date,
    verificationCodeToken:string,
    verificationCodeExpires:Date,
    github:string,
    tokens:AuthToken[],
    name: string,
    avatar: string,
    notes:any[],
    compareValidateCode:any,
    comparePassword: any,
    gravatar:()=>{}
}
export type AuthToken = {
    accessToken: string,
    kind: string
  };
var userSchema = new Schema({
    id: { type: String, unique: true },
    email:{type:String},
    password:String,
    passwordRestToken:String,
    passwordRestExpires:Date,
    verificationCodeToken:String,
    verificationCodeExpires:Date,
    github:String,
    tokens:Array,
    name: String,
    avatar: String,
    notes: [{
        type: Number,
        ref: 'Article'
    }]
})

userSchema.methods.comparePassword = function(candidatePassword:string, cb:(err:any,isMatch:any)=>{}) {
    bcrypt.compare(candidatePassword, this.password, (err, isMa) => {
      cb(err, isMa);
    });
  };
  userSchema.pre('save',function(next){
      let self = this;
      if(!self.id){
        self.id = self._id.toString();
      }
      if(!self.isModified('password')){return next()};
      if(!self.avatar) {
        self.avatar = self.gravatar();
      }
      
      bcrypt.genSalt(10,(error:Error,result)=>{
          if(error) return next(error);
          bcrypt.hash(self.password,result,undefined,(err:Error,hash)=>{
            if(err) return next(err);
            self.password = hash;
            next()
          })
      });
  })
  userSchema.methods.gravatar = function (size: number) {
    if (!size) {
      size = 200;
    }
    if (!this.email) {
      return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash("md5").update(this.email).digest("hex");
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
  };

var User = mongoose.model('User', userSchema);

export default User;