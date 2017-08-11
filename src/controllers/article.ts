import { tranferJson } from './../util/util';
import { Request,Response } from 'express';
import {default as Article, ArticleModel} from '../models/Article'
import * as htmlToText from 'html-to-text'
export let getNote = (req:Request,res: Response) => {
    let page = +req.query.page || 0;
    let courent = 10;
    let num =  page * courent + 1;
    Article.find().sort({time:'desc'}).limit(courent).skip(num).exec(function(err:any,articles:ArticleModel[]){
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
                ignoreImage: true,
                ignoreHref: true,
                preserveNewlines:true                   
            });
            var reg = /\\n|\s/g;
            json.content = text.replace(reg,"").substring(0,140);
           resultJson.push(json)
        })
        res.json(tranferJson({status:1},resultJson));    
    })
}