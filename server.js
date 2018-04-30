const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PersonalUser = require('./models/PersonalUser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes
require('./routes/PeronalUserRoute')(app);

app.listen(5000);
console.log("Server started: port 5000");