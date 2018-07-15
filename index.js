// @ts-check
'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const models = require('./models/index');
const passportConfig = require('./services/passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.listen(5000);
module.exports.app = app;