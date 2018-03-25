import { Request,Response,NextFunction } from 'express';
import * as SMSClient from '@alicloud/sms-sdk';
import { WriteError } from "mongodb";
import * as _ from 'lodash';
import * as async from "async";

import { default as User, UserModel, AuthToken } from "../models/User";
import { tranferJson } from './../util/util';

import {upload} from '../config/imageUpload';

export let postFileUpload = (req:Request,res: Response,next:NextFunction)=>{
    
    upload(req, function(err, data) {    
           if (err) {
             return res.status(404).end(JSON.stringify(err));
           }      
           //res.send({link:`http://${req.headers.host}${data.link}`});
           res.send(data);
         });
}

export let sendNote = (req:Request,res: Response,next:NextFunction)=>{
  async.waterfall([
    function createRandomToken(done: Function) {
      let str = '';
      for(var i=0;i<4;i++){
        str += _.random(0,9,false);
      }
      done(null, str);
    },
    function setRandomToken(token:string,done: Function){
      User.findOne({ name: req.body.phone }, (err, user: any) => {
        if (err) { return done(err); }
        if (!user) {
          res.send(tranferJson({status:0,message:'用户不存在'}));
          return;
        }   
        user.verificationCodeToken = token;
        user.verificationCodeExpires = Date.now() + 300000; // 5分钟
        user.save((err: WriteError,userInfo:UserModel) => {
          if(err) return done(err);
            done(err, token, userInfo);
        });
      })
    },
    function sendNote(token:string,user:UserModel,done:Function){
      // ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
      const accessKeyId = process.env.ALI_ACCESSKEYID
      const secretAccessKey = process.env.ALI_SECRETACCESSKEY
      //初始化sms_client
      let smsClient = new SMSClient({accessKeyId, secretAccessKey})
      //发送短信
      smsClient.sendSMS({
          PhoneNumbers: user.name,
          SignName: '吴涛',
          TemplateCode: 'SMS_97085004',
          TemplateParam: `{"code":"${token}","product":"涛cling"}`
      }).then(function (response) {
          let {Code}=response;
          if (Code === 'OK') {
              res.send(tranferJson({status:1,message:'验证码发送成功!'}));
          } else {
            done(null);
          }
      }, function (err) {
        done(err)
      })
    }
  ],(err) => {
    if (err) { return next(err); }
  })
}