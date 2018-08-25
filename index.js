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


// Routes
require('./routes/authRoute')(app);
require('./routes/businessUserRoute')(app);
require('./routes/PeronalUserRoute')(app);
require('./routes/talentRoute')(app);
console.log("Server started: port 5000");
module.exports.app = app;
app.listen(5000);