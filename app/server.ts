/**
 * Module dependencies.
 */
import * as express from "express";
import * as compression from "compression";  // compresses requests
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as errorHandler from "errorhandler";
import * as lusca from "lusca";
import * as dotenv from "dotenv";
import * as mongo from "connect-mongo";
import * as path from "path";
import * as mongoose from "mongoose";
import * as passport from "passport";

import {join} from 'path';

const MongoStore = mongo(session);
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI,{useMongoClient: true});
(<any>mongoose).Promise = global.Promise;
mongoose.connection.on("error", () => {
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});


const PORT = process.env.PORT || 3000;
const DIST_FOLDER = join(process.cwd(), 'dist');

/**
 * Express configuration.
 */
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
    autoReconnect: true
  }),
  cookie:{
    maxAge: 30*60*1000
  }
}));;


app.use(passport.initialize());
app.use(passport.session());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use('/uploads', express.static(join(DIST_FOLDER, 'uploads')));

import './config/passport';
import * as articleController from './controllers/article';
import * as userController from './controllers/user';
import * as apiController from './controllers/api';

app.get("/v1/atricles", articleController.getNote);
app.post("/v1/atricles", articleController.getNote);
app.get("/v1/getArticleDetail", articleController.getDetail);
app.post("/v1/getArticleDetail", articleController.getDetail);
app.post("/v1/login",userController.postLogin);
app.post("/v1/postLoginByNote",userController.postLoginByNote);
app.post("/v1/register",userController.postRegister);
app.get("/v1/getUser",userController.getUser);
app.post("/v1/getUser",userController.getUser);
app.get("/v1/logout",userController.logout);
app.post("/v1/logout",userController.logout);
app.post("/v1/forget",userController.postForgot);
app.get("/v1/reset",userController.postReset);
app.post("/v1/reset",userController.postReset);
app.post("/v1/publish",articleController.publish);

app.post('/v1/upload', apiController.postFileUpload);
app.post('/v1/sendNote', apiController.sendNote);//发送短信

app.get('/auth/github', passport.authenticate('github',{ scope: [ 'user:email' ] }));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
 res.redirect('/')
});

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));


// ALl regular routes use the Universal engine
app.get('*',(req,res)=>{
  res.sendFile(join(DIST_FOLDER, 'browser/index.html'));
});

app.use(errorHandler());

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
