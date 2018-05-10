const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PersonalUser = require('./models/PersonalUser');
const passportConfig = require('./services/passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes
require('./routes/AuthRoute')(app);

app.listen(5000);
console.log("Server started: port 5000");