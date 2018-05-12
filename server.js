'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PersonalUser = require('./models/personalUser');

const passportConfig = require('./services/passport');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes
require('./routes/authRoute')(app);
require('./routes/businessUserRoute')(app);
app.listen(5000);
console.log("Server started: port 5000");