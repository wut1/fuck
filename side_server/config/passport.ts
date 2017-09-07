import * as passport from 'passport';
import {default as User, UserModel } from "./../models/User";
import * as passportLocal from "passport-local";
import {Strategy as GitHubStrategy} from 'passport-github2';
import { WriteError } from "mongodb";



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

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: '/auth/github/callback'
  }, (accessToken, refreshToken, profile:any, done) => {
    User.findOne({ github: profile.id },(err, existingUser)=>{
      if (err) { return done(err); }
      if (existingUser) {
        done(null,existingUser)
      }else {
        User.findOne({ email: profile._json.email},(error,existingEmailUser)=>{
          if (err) { return done(err); }
          if (existingEmailUser) {
            done(err);
          } else {
            let user:UserModel = new User({
              email:profile._json.email,
              github:profile.id
            }) as UserModel;
            user.tokens.push({ kind: 'github', accessToken });
            user.name = profile.username;
            user.avatar = profile._json.avatar_url;
            user.save((err) => {
              done(err, user);
            });
          }
        })
      }
    })
  }));
 