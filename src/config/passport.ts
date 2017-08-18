import * as passport from 'passport';
import { UserModel } from "./../models/User";
import * as passportLocal from "passport-local";
import { WriteError } from "mongodb";
import { default as User} from '../models/User'



let LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ name: username }, function (err:WriteError, user:UserModel) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false);
        }
        user.comparePassword(password,(err: Error, isMatch: boolean)=> {
          if (err) { return done(err); }
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false);
        });
       
      });
    }
  ));