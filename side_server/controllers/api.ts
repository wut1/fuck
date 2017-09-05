import { Request,Response,NextFunction } from 'express';

import {upload} from '../config/imageUpload';

export let postFileUpload = (req:Request,res: Response,next:NextFunction)=>{
    
    upload(req, function(err, data) {    
           if (err) {
             return res.status(404).end(JSON.stringify(err));
           }      
           res.send({link:`http://${req.headers.host}${data.link}`});
         });
}