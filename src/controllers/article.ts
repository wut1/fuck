import { tranferJson } from './../util/util';
import { Request,Response } from 'express';
import {default as Article, ArticleModel} from '../models/Article'
import * as htmlToText from 'html-to-text'
export let getNote = (req:Request,res: Response) => {
    Article.find().sort({time:'desc'}).limit(10).exec(function(err:any,articles:ArticleModel[]){
        if (err) return;
        let resultJson:any[] = [];
        articles.forEach(function(item,index){
            let json:any = {
                id:item.id,
                title:item.title,
                time:item.time,
                meta:item.meta
            };
            var text = htmlToText.fromString(item.content, {
                wordwrap: false,
                ignoreImage: true,
                ignoreHref: true                   
            });
            json.content = text.split('\n').join('').substring(0,140);
           resultJson.push(json)
        })
        res.json(tranferJson({status:1},resultJson));    
    })
}