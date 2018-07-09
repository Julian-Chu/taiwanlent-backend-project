'use strict';

import express from 'express';
import bodyParser from 'body-parser';

import passportConfig from './services/passport';
import './routes/authRoute';
import './routes/businessUserRoute';
import models from './models';
const gender = models.Gender.findById(1);
console.log(gender);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.listen(8081);