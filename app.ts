import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import logger from 'morgan';
import errorHandler from 'errorhandler';
import dotenv from 'dotenv';
import connectMongo = require('connect-mongo');
const MongoStore =  connectMongo(session);
import path from 'path';

import mongoose from 'mongoose';
dotenv.config({ path: '.env.example' });

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

app.set('port', process.env.PORT || 3000);