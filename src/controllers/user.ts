import * as passport from "passport";
import { LocalStrategyInfo } from "passport-local";
import { WriteError } from "mongodb";
import { default as User, UserModel, AuthToken } from "../models/User";
import { Request, Response, NextFunction } from "express";
import * as async from "async";
import * as crypto from "crypto";
import { tranferJson } from './../util/util';



export let postLogin = (req:Request,res:Response,next:NextFunction)=>{
    passport.authenticate('local', function(err:Error, user:UserModel, info:LocalStrategyInfo) {
        if (err) { return next(err); }
        if (!user) { res.send(tranferJson({status:0,message:'用户不存在'})) }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          res.send(tranferJson({status:1,message:'登录成功'}))
        });
      })(req, res, next);
}

export let postRegister = (req:Request,res:Response,next:NextFunction)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    User.findOne({email:req.body.email},(err:WriteError,resultUser:UserModel)=>{
        if(err) return next(err);
        if(resultUser){
            res.send(tranferJson({status:0,message:'用户已存在'}))
        } else {
            user.save((error:any,personUser)=>{
                if(error) return next(error);
                res.send(tranferJson({status:1,message:'注册成功'}))
            })
        }
    })
}

export let getUser = (req:Request,res:Response,next:NextFunction)=>{
    if(req.user){
        res.send(tranferJson({status:1},{name:req.user.name,email:req.user.email,avatar:req.user.avatar}));
    } else {
        res.send(tranferJson({status:0,message:'用户未登陆'}))
    }
}