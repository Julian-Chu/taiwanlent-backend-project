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
require('./routes/TalentRoute')(app);
require('./routes/AuthRoute')(app);
require('./routes/BusinessUserRoute')(app);
require('./routes/PeronalUserRoute')(app);
console.log("Server started: port 5000");
module.exports.app = app;
app.listen(5000);