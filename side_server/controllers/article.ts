import { tranferJson } from './../util/util';
import { Request,Response,NextFunction } from 'express';
import {default as Article, ArticleModel} from '../models/Article'
import { WriteError } from "mongodb";
import '../models/User'
import * as htmlToText from 'html-to-text'

export let getNote = (req:Request,res: Response) => {
    let page = +req.body.page||+req.query.page || 0;
    let courent = 10;
    let num =  page * courent;
    
    Article.find().sort({time:'desc'}).limit(courent).skip(num).populate('_creator').exec(function(err,articles:ArticleModel[]){
        if(err) return;
        let resultJson:any[] = [];
        articles.forEach(function(item,index){
            let json:any = {
                id:item.id,
                title:item.title,
                time:item.time,
                meta:item.meta
            };
            var text = htmlToText.fromString(item.content, {
                ignoreImage: true,
                ignoreHref: true,
                preserveNewlines:true                   
            });
            var reg = /\\n|\s/g;
            json.content = text.replace(reg,"").substring(0,140) + '...';
            json.user = {
                id:item._creator.id,
                name:item._creator.name,
                avatar:item._creator.avatar
            }  
            resultJson.push(json)
        });
        res.send(tranferJson({status:1},resultJson));
    });
}

export let getDetail = (req:Request,res: Response) => {
    let id = req.query.id || req.body.id;
    Article.findOne({id:id}).populate('_creator').exec(function(err:WriteError,item:ArticleModel){
        if(err) return;
        let resultJson;
        if(!item){
            resultJson = {};
        } else {
            item.meta.look++;
            item.save()
         resultJson = {
                title:item.title,
                time:item.time,
                meta:item.meta,
                content:item.content,
                user:{
                    id:item._creator.id,
                    name:item._creator.name,
                    avatar:item._creator.avatar
                }
            };
        }
        res.send(tranferJson({status:1},resultJson));
    })
}

export let publish = (req:Request,res: Response,next:NextFunction)=>{
    let article = new Article({
        title: req.body.title,
        content: req.body.editor,
        time:Date.now(),
        _creator:req.user._id,
        meta:{
            look: 0,
            favs: 0,
            comments: 0
        }
    })
    article.save((error:any,note)=>{
        if(error) return next(error);
        res.send(tranferJson({status:1,message:'发布成功'}))         
    })
}

