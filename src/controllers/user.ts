import * as passport from "passport";
import { LocalStrategyInfo } from "passport-local";
import { WriteError } from "mongodb";
import { default as User, UserModel, AuthToken } from "../models/User";
import { Request, Response, NextFunction } from "express";
import * as async from "async";
import * as crypto from "crypto";


export let postLogin = (req:Request,res:Request)=>{
    
}