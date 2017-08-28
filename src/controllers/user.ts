import * as passport from "passport";
import { LocalStrategyInfo } from "passport-local";
import { WriteError } from "mongodb";
import { default as User, UserModel, AuthToken } from "../models/User";
import { Request, Response, NextFunction } from "express";
import * as async from "async";
import * as crypto from "crypto";
import { tranferJson } from './../util/util';
import * as nodemailer from 'nodemailer';


export let postLogin = (req:Request,res:Response,next:NextFunction)=>{
    passport.authenticate('local', function(err:Error, user:UserModel, info:LocalStrategyInfo) {
        // if(info.message){  
        //   res.send(tranferJson({status:0,message:info.message}))
        // }
        if (err) { return next(err); }
        if (!user) {
          res.send(tranferJson({status:0,message:info.message})) }
        req.logIn(user, function(err) {
          if (err) { 
            return next(err); }
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

export let logout = (req:Request,res:Response,next:NextFunction)=>{
    req.logout();
    res.send(tranferJson({status:1,message:'退出成功'}))
}

export let postForgot = (req: Request, res: Response, next: NextFunction) => {
    async.waterfall([
      function createRandomToken(done: Function) {
        crypto.randomBytes(16, (err, buf) => {
          const token = buf.toString("hex");
          done(err, token);
        });
      },
      function setRandomToken(token: AuthToken, done: Function) {
        User.findOne({ email: req.body.email }, (err, user: any) => {
          if (err) { return done(err); }
          if (!user) {
            res.send(tranferJson({status:0,message:'用户不存在'}));
            return;
          }        
          user.passwordRestToken = token;
          user.passwordRestExpires = Date.now() + 3600000; // 1 hour
          user.save((err: WriteError,userInfo:UserModel) => {
            if(err) return done(err);
              done(err, token, user);
          });
        });
      },
      function sendForgotPasswordEmail(token: AuthToken, user: UserModel, done: Function) {
        const transporter = nodemailer.createTransport({
          service: "qq",
          auth: {
            user: process.env.SENDGRID_USER,
            pass: process.env.SENDGRID_PASSWORD
          }
        });
        const mailOptions = {
          to: user.email,
          from: process.env.SENDGRID_USER,
          subject: "重置你的cling密码",
          text: `点击链接修改密码.\n\n
            http://${req.headers.host}/reset/${token}\n\n
            1小时内有效.\n`
        };
        transporter.sendMail(mailOptions, (err) => {
          if(err) done(err);    
            res.send(tranferJson({status:1,message:'邮件发送成功!'}))
        });
      }
    ], (err) => {
      if (err) { return next(err); }
      res.send(tranferJson({status:0,message:'邮件发送错误'}))
    });
  };

  export let postReset = (req: Request, res: Response, next: NextFunction) => {
    async.waterfall([
      function resetPassword(done: Function) {
        User
          .findOne({ passwordRestToken: req.params.token||req.body.token })
          .where("passwordRestExpires").gt(Date.now())
          .exec((err, user: any) => {
            if (err) { return next(err); }
            if (!user) {
              res.send(tranferJson({status:0,message:'要修改密码的用户不存在'}));
              return;
            }
            user.password = req.body.password;
            user.passwordRestToken = undefined;
            user.passwordRestExpires = undefined;
            user.save((err: WriteError) => {
              if (err) { return next(err); }
              req.logIn(user, (err) => {
                if(err) {
                  done(err);
                };
                res.send(tranferJson({status:1,message:'密码修改成功'}));
              });
            });
          });
      }
    ], (err) => {
      if (err) { return next(err); }
     
    });
  };