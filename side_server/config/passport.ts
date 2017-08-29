import * as passport from 'passport';
import { UserModel } from "./../models/User";
import * as passportLocal from "passport-local";
import { WriteError } from "mongodb";
import { default as User} from '../models/User'



let LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
  if(user){
    done(undefined, user._id);
  }
});

passport.deserializeUser((_id, done) => {
  User.findById(_id, (err, user) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy({ usernameField: "email" },
    (email, password, done)=>{
      User.findOne({ email: email.toLowerCase() }, function (err:WriteError, user:UserModel) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false,{ message: "用户不存在" });
        }
        user.comparePassword(password,(err: Error, isMatch: boolean)=> {
          if (err) { return done(err); }
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false,{ message: "密码不正确" });
        });
       
      });
    }
  ));

 