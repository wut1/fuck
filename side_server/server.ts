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


const MongoStore = mongo(session);

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config();

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);

mongoose.connection.on("error", () => {
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});



/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 3000);
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
app.use(express.static(path.join(__dirname)));

import './config/passport';
import * as articleController from './controllers/article';
import * as userController from './controllers/user';
import * as apiController from './controllers/api';

app.get("/v1/atricles", articleController.getNote);
app.post("/v1/atricles", articleController.getNote);
app.get("/v1/getArticleDetail", articleController.getDetail);
app.post("/v1/getArticleDetail", articleController.getDetail);
app.post("/v1/login",userController.postLogin);
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


// app.get('/*', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });
app.all('/*', function (req, res) {
  res.sendFile(path.join(__dirname, "../dist_client/index.html"));
});
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;